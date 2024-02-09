/* eslint-disable @typescript-eslint/member-ordering */

import { Buffer } from 'buffer'

import FormData from 'form-data'
import { CONFIG_KEY, IMAGE_HASH_TYPE } from './constants'
import { formatUserConfig } from './config'
import type { IPicGo, IReqOptionsWithBodyResOnly, IImgInfo } from 'picgo'
import type { FormattedUserConfig } from './types/config'
import type { SizeVariantResource, Photo, Album, ApiResponse } from './types/immich'
import type { LocaleKey } from './types/locale'


class UploaderUtils {
  public userConfig: FormattedUserConfig

  private ctx: IPicGo

  private imageHashMap = new Map<string, { url?: SizeVariantResource['url'] }>()

  constructor(ctx: IPicGo) {
    this.ctx = ctx

    this.userConfig = formatUserConfig(ctx, ctx.getConfig(CONFIG_KEY))

    ctx.log.info(
      ctx.i18n.translate<LocaleKey>('UPLOADER_CONFIG_FORMATTER_RESULT_LOG', {
        config: JSON.stringify({
          ...this.userConfig,
          token: `<length ${this.userConfig.token.length}>`,
        }),
      })
    )
  }

  /**
   * create normal tasks
   */
  public async createNormalTasks(outputs: IImgInfo[]): Promise<void> {
    await Promise.all(outputs.map((imageInfo) => this.createNormalTask(imageInfo)))
  }

  private async createNormalTask(imageInfo: IImgInfo): Promise<void> {
    const uploadedPhotoData = await this.uploadPhoto(imageInfo, this.userConfig.albumId,this.userConfig.shareLinkId)

    await this.addAssetsToAlbum(uploadedPhotoData.id, this.userConfig.albumId)
    return this.setImageInfo(imageInfo, uploadedPhotoData.id)


  }



  private async createUniqueTask(imageInfo: IImgInfo): Promise<void> {
    const imageHash: string = imageInfo['checksum']
    const tmpImgUrl: { url?: SizeVariantResource['url'] } = { url: null }

    if (imageHash) {
      if (this.imageHashMap.has(imageHash)) {
        imageInfo['tmpImgUrl'] = this.imageHashMap.get(imageHash)

        this.ctx.log.info(
          this.ctx.i18n.translate<LocaleKey>('UPLOADER_UPLOAD_UNIQUE_LOG', {
            filename: imageInfo.fileName || '',
          })
        )

        return
      }

      this.imageHashMap.set(imageHash, (imageInfo['tmpImgUrl'] = tmpImgUrl))
    }

    await this.createNormalTask(imageInfo)

    tmpImgUrl.url = imageInfo['imgUrl']?.slice(this.userConfig.url.length + 1)
  }

  private addAssetsToAlbum(imageid: string, albumID: string): Promise<ApiResponse> {

  
    return this.ctx.request({
      ...this.globalRequestConfig('PUT',{'Content-Type': 'application/json'}),
      url: `/album/${albumID}/assets`,
      data: JSON.stringify({
        "ids": [
          imageid
        ]
      })
    });
  }
  
  private setImageInfo(imageInfo: IImgInfo, imageid: string): void {
    //const url = imageUrl ? `${this.userConfig.url}/${imageUrl}` : ''
    const url = imageid ? `${this.userConfig.url}/api/asset/file/${imageid}?isThumb=false&isWeb=false&key=${this.userConfig.shareLinkId}`:''
    const imgUrl = imageid ? `${this.userConfig.url}/api/asset/thumbnail/${imageid}?format=WEBP&key=${this.userConfig.shareLinkId}`:''
    imageInfo['imgUrl'] = imgUrl
    imageInfo['url'] = url
  }

  private async uploadPhoto(imageInfo: IImgInfo, albumId: string,shareLinkId: string): Promise<Photo> {
    const formData = new FormData()
    const deviceAssetId: string = Date.now().toString();

    formData.append('deviceAssetId', deviceAssetId);
    formData.append('deviceId', 'typescript');
    
    
    const currentDate = new Date();
    formData.append('fileCreatedAt', currentDate.toISOString());
    formData.append('fileModifiedAt', currentDate.toISOString());

    
    formData.append('isFavorite', 'false');
    formData.append('assetData', imageInfo.buffer, imageInfo.fileName);


    this.ctx.log.info(
      this.ctx.i18n.translate<LocaleKey>('UPLOADER_UPLOAD_IMAGE_LOG', {
        filename: imageInfo.fileName || '',
        checksum: imageInfo['checksum'] || 'empty',
        size: `${imageInfo.buffer!.byteLength}`,
        albumId,
        shareLinkId
      })
    )

    return this.ctx.request({
      ...this.globalRequestConfig('POST'),
      url: `/asset/upload`,
      data: formData
    });
  }


  private mergeDictionaries<T extends Record<string, any>>(...dicts: T[]): T {
    return Object.assign({}, ...dicts);
  }
  
  private globalRequestConfig(method: string, header?: Record<any, any>, Accept?: string): IReqOptionsWithBodyResOnly {
    const headers = {
      'Accept': Accept ? Accept : 'application/json',
      'x-api-key': this.userConfig.token
    }
    const headersd = header? this.mergeDictionaries(headers, header): headers
    return {
      baseURL: `${this.userConfig.url}/api/`,
      headers: headersd,
      method: method
    }
  }
  
}

export async function uploader(ctx: IPicGo): Promise<void> {
  const uploaderUtils = new UploaderUtils(ctx)
  const outputs = ctx.output.filter((imageInfo) => {
    // if only base64 is available without a buffer, then convert the base64 to a buffer
    if (!imageInfo.buffer?.byteLength && imageInfo.base64Image) {
      imageInfo.buffer = Buffer.from(imageInfo.base64Image, 'base64')
    }

    const valid = !!imageInfo.buffer?.byteLength

    if (!valid) {
      ctx.log.warn(
        ctx.i18n.translate<LocaleKey>('UPLOADER_INVALID_INPUT', {
          filename: imageInfo.fileName || '',
        })
      )
    }

    return valid
  })

  if (!outputs.length) {
    const errorMessage = ctx.i18n.translate<LocaleKey>('UPLOADER_NO_INPUT')

    ctx.log.error(errorMessage)

    throw new Error(errorMessage)
  }

  try {

    await uploaderUtils.createNormalTasks(outputs)

    outputs.forEach((imageInfo) => {
      ctx.log.info(
        ctx.i18n.translate<LocaleKey>('UPLOADER_UPLOAD_RESULT_LOG', {
          filename: imageInfo.fileName || '',
          url: imageInfo.imgUrl || '',
        })
      )
    })
  } catch (err: unknown) {
    ctx.log.error(ctx.i18n.translate<LocaleKey>('UPLOADER_FAILED'))
    ctx.log.error(err as Error)

    ctx.emit('notification', {
      title: ctx.i18n.translate<LocaleKey>('UPLOADER_FAILED_TITLE_NOTIFY'),
      body: ctx.i18n.translate<LocaleKey>('UPLOADER_FAILED_BODY_NOTIFY'),
      text: '',
    })

    throw err
  }
}
