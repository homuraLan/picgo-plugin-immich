import type { Locale } from '../types/locale'

export const zhTW: Locale = {
  PLUGIN_VERSION_ERROR:
    '目前的 PicGo-Core 版本過低，上傳插件 "${pluginName}" 需要 v${version} 或以上版本才能運行。',

  UPLOADER_CONFIG_URL: 'immich 網頁地址',
  UPLOADER_CONFIG_TOKEN: 'immich API Token',
  UPLOADER_CONFIG_ALBUM_ID: '相簿編號',
  UPLOADER_CONFIG_SHARE_LINK_ID: '共享链接編號',
  UPLOADER_CONFIG_UNIQUE_IMAGE: '避免在相簿中上傳重複圖片',
  UPLOADER_CONFIG_UNIQUE_IMAGE_SIZE_LIMIT: '若圖片大小超過該值則不驗證圖片是否重複',

  UPLOADER_CONFIG_VALIDATE_URL_EMPTY: 'immich 網頁地址不能為空',
  UPLOADER_CONFIG_VALIDATE_TOKEN_EMPTY: 'immich API Token 不能為空',

  UPLOADER_CONFIG_FORMATTER_INVALID: '插件配置不合法 (${configName})，請檢查配置檔案。',
  UPLOADER_CONFIG_FORMATTER_RESULT_LOG: '格式化後的配置: `${config}`',

  UPLOADER_NO_INPUT: '缺少輸入檔案。',
  UPLOADER_INVALID_INPUT: '檔案 ${filename} 缺少 buffer 或無法轉換為 buffer。',
  UPLOADER_FAILED: '上傳時發生錯誤，請檢查網路連線和配置是否正確。',
  UPLOADER_FAILED_TITLE_NOTIFY: '上傳錯誤',
  UPLOADER_FAILED_BODY_NOTIFY: '請檢查您的網路連線和配置。',
  UPLOADER_UPLOAD_IMAGE_LOG:
    '正在上傳 ${filename}，checksum: ${checksum}，檔案大小: ${size}，相簿: ${albumId}, 共享链接：${shareLinkId}',
  UPLOADER_UPLOAD_UNIQUE_LOG: '${filename}: 檔案重複，跳過上傳',
  UPLOADER_UPLOAD_RESULT_LOG: '${filename}: ${url}',
}
