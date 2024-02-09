import type { Locale } from '../types/locale'

export const en: Locale = {
  PLUGIN_VERSION_ERROR:
    'The current PicGo-Core version is too low. The upload plugin "${pluginName}" requires version v${version} or above to run.',

  UPLOADER_CONFIG_URL: 'immich Web URL',
  UPLOADER_CONFIG_TOKEN: 'immich API Token',
  UPLOADER_CONFIG_ALBUM_ID: 'Album ID',
  UPLOADER_CONFIG_SHARE_LINK_ID: 'ShareLink ID',
  UPLOADER_CONFIG_UNIQUE_IMAGE: 'Avoid uploading duplicate images in the album',
  UPLOADER_CONFIG_UNIQUE_IMAGE_SIZE_LIMIT:
    'Do not validate image duplicates if the image size exceeds this value',

  UPLOADER_CONFIG_VALIDATE_URL_EMPTY: 'immich Web URL cannot be empty',
  UPLOADER_CONFIG_VALIDATE_TOKEN_EMPTY: 'immich API Token cannot be empty',

  UPLOADER_CONFIG_FORMATTER_INVALID:
    'Plugin configuration is invalid (${configName}), please check the configuration file.',
  UPLOADER_CONFIG_FORMATTER_RESULT_LOG: 'Formatted config: `${config}`',

  UPLOADER_NO_INPUT: 'Missing input file.',
  UPLOADER_INVALID_INPUT:
    'The file ${filename} is missing a buffer or cannot be converted to a buffer.',
  UPLOADER_FAILED:
    'An error occurred during the upload. Please check your network connection and configuration.',
  UPLOADER_FAILED_TITLE_NOTIFY: 'Upload error',
  UPLOADER_FAILED_BODY_NOTIFY: 'Please check your network connection and configuration.',
  UPLOADER_UPLOAD_IMAGE_LOG:
    'Uploading ${filename}, checksum: ${checksum}, file size: ${size}, album: ${albumId}',
  UPLOADER_UPLOAD_UNIQUE_LOG: '${filename}: File is a duplicate, skipping upload',
  UPLOADER_UPLOAD_RESULT_LOG: '${filename}: ${url}',
}
