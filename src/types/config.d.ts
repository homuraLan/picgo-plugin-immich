export interface UserConfig {
  url: string
  token: string
  albumId?: string
  // Avoid uploading identical images within the same album.
  shareLinkId?: string,

  uniqueImage?: boolean
  // Avoiding duplicates requires recalculating file hashes, and large images may consume a significant amount of time.
  uniqueImageSizeLimit?: string | number
}

export interface FormattedUserConfig extends UserConfig {
  // url always ends without '/'
  albumId: string
  shareLinkId: string | undefined
}
