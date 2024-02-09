import type { Locale } from '../types/locale'

export const zhCN: Locale = {
  PLUGIN_VERSION_ERROR:
    '当前 PicGo-Core 版本过低，上传插件 "${pluginName}" 需要 v${version} 或以上版本才能运行。',

  UPLOADER_CONFIG_URL: 'immich 网页地址',
  UPLOADER_CONFIG_TOKEN: 'immich API Token',
  UPLOADER_CONFIG_ALBUM_ID: '相册编号',
  UPLOADER_CONFIG_SHARE_LINK_ID: '共享链接编号',
  UPLOADER_CONFIG_UNIQUE_IMAGE: '避免在相册中上传重复图片',
  UPLOADER_CONFIG_UNIQUE_IMAGE_SIZE_LIMIT: '最大避免上传重复图片的大小',

  UPLOADER_CONFIG_VALIDATE_URL_EMPTY: 'immich 网页地址不能为空',
  UPLOADER_CONFIG_VALIDATE_TOKEN_EMPTY: 'immich API Token 不能为空',

  UPLOADER_CONFIG_FORMATTER_INVALID: '插件配置不合法 (${configName})，请检查配置文件。',
  UPLOADER_CONFIG_FORMATTER_RESULT_LOG: '格式化后的配置: `${config}`',

  UPLOADER_NO_INPUT: '缺少输入文件。',
  UPLOADER_INVALID_INPUT: '文件 ${filename} 缺少 buffer 或无法转换为 buffer。',
  UPLOADER_FAILED: '上传时发生错误，请检查网络连接和配置是否正确。',
  UPLOADER_FAILED_TITLE_NOTIFY: '上传错误',
  UPLOADER_FAILED_BODY_NOTIFY: '请检查网络连接和配置。',
  UPLOADER_UPLOAD_IMAGE_LOG:
    '正在上传 ${filename}，checksum: ${checksum}，文件大小: ${size}，相册: ${albumId}',
  UPLOADER_UPLOAD_UNIQUE_LOG: '${filename}: 文件重复，跳过上传',
  UPLOADER_UPLOAD_RESULT_LOG: '${filename}: ${url}',
}
