import humanFormat from 'human-format'
import {
  CONFIG_KEY,
  DEFAULT_ALBUM_NAME,
  DEFAULT_UNIQUE_IMAGE,
  DEFAULT_UNIQUE_IMAGE_SIZE_LIMIT,
} from './constants'
import type { IPicGo, IPluginConfig } from 'picgo'
import type { UserConfig, FormattedUserConfig } from './types/config'
import type { LocaleKey } from './types/locale'

const binaryScale = humanFormat.Scale.create(['', 'K', 'M', 'G', 'T'], 1024)

export function config(ctx: IPicGo): IPluginConfig[] {
  const isGui = !!ctx.GUI_VERSION
  const defaultUserConfig: UserConfig = {
    url: '',
    token: '',
    albumId: DEFAULT_ALBUM_NAME,
    uniqueImage: DEFAULT_UNIQUE_IMAGE,
    uniqueImageSizeLimit: DEFAULT_UNIQUE_IMAGE_SIZE_LIMIT,
  }
  const userConfig: UserConfig = {
    ...defaultUserConfig,
    ...ctx.getConfig<IPluginConfig>(CONFIG_KEY),
  }

  return [
    {
      name: 'url',
      type: 'input',
      default: userConfig.url,
      required: true,
      get message(): string {
        return ctx.i18n.translate<LocaleKey>('UPLOADER_CONFIG_URL')
      },
      validate: !isGui
        ? (input: string): string | true => {
            if (input.trim() === '') {
              return ctx.i18n.translate<LocaleKey>('UPLOADER_CONFIG_VALIDATE_URL_EMPTY')
            }
            return true
          }
        : undefined,
    },
    {
      name: 'token',
      type: 'password',
      default: userConfig.token,
      required: true,
      get message(): string {
        return ctx.i18n.translate<LocaleKey>('UPLOADER_CONFIG_TOKEN')
      },
      validate: !isGui
        ? (input: string): string | true => {
            if (input.trim() === '') {
              return ctx.i18n.translate<LocaleKey>('UPLOADER_CONFIG_VALIDATE_TOKEN_EMPTY')
            }
            return true
          }
        : undefined,
    },
    {
      name: 'albumId',
      type: 'input',
      default: userConfig.albumId,
      required: false,
      get message(): string {
        return ctx.i18n.translate<LocaleKey>('UPLOADER_CONFIG_ALBUM_ID')
      },
    },
    // {
    //   name: 'uniqueImage',
    //   type: 'confirm',
    //   default: userConfig.uniqueImage,
    //   required: false,
    //   get message(): string {
    //     return ctx.i18n.translate<LocaleKey>('UPLOADER_CONFIG_UNIQUE_IMAGE')
    //   },
    // },
    // {
    //   name: 'uniqueImageSizeLimit',
    //   type: 'input',
    //   default: userConfig.uniqueImageSizeLimit,
    //   required: false,
    //   get message(): string {
    //     return ctx.i18n.translate<LocaleKey>('UPLOADER_CONFIG_UNIQUE_IMAGE_SIZE_LIMIT')
    //   },
    //   when: !isGui ? (answer: any): boolean => answer.uniqueImage : undefined,
    // },
  ]
}

export function formatUserConfig(ctx: IPicGo, userConfig: UserConfig): FormattedUserConfig {
  // check url and token is not empty
  for (const configName of ['url', 'token'] as const) {
    if (!userConfig[configName]) {
      const errorMessage = ctx.i18n.translate<LocaleKey>('UPLOADER_CONFIG_FORMATTER_INVALID', {
        configName,
      })

      ctx.log.error(errorMessage)

      throw new Error(errorMessage)
    }
  }

  const uniqueImage = !!userConfig.uniqueImage
  let uniqueImageSizeLimit = 0

  if (uniqueImage) {
    try {
      // parse human readable size
      uniqueImageSizeLimit = humanFormat.parse(
        (`${userConfig.uniqueImageSizeLimit}` || DEFAULT_UNIQUE_IMAGE_SIZE_LIMIT).toUpperCase(),
        { scale: binaryScale }
      )
    } catch (err) {
      const errorMessage = ctx.i18n.translate<LocaleKey>('UPLOADER_CONFIG_FORMATTER_INVALID', {
        configName: 'uniqueImageSizeLimit',
      })

      ctx.log.error(errorMessage)

      throw new Error(errorMessage)
    }
  }

  return {
    url: userConfig.url.replace(/\/*$/, ''),
    token: userConfig.token,
    albumId: userConfig.albumId || DEFAULT_ALBUM_NAME,
    uniqueImage,
    uniqueImageSizeLimit,
  }
}
