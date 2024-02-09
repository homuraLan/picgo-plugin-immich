import type { Nullable } from './utils'

export interface SizeVariantResource {
  url: Nullable<string>
  width: Nullable<number>
  height: Nullable<number>
  filesize: Nullable<number>
}

export interface Photo {
  id: string
  duplicate: boolean
}

// export interface Album {
//   id: string
//   title: string
//   num_photos: number
//   photos: Photo[]
//   created_at: string
//   updated_at: string
// }
export interface Owner {
  id: string;
  email: string;
  name: string;
  profileImagePath: string;
  avatarColor: string;
  storageLabel: string;
  externalPath: null | string;
  shouldChangePassword: boolean;
  isAdmin: boolean;
  createdAt: string;
  deletedAt: null | string;
  updatedAt: string;
  oauthId: string;
  memoriesEnabled: boolean;
}

export interface Album {
  albumName: string;
  description: string;
  albumThumbnailAssetId: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  ownerId: string;
  owner: Owner;
  sharedUsers: any[]; // You can replace this with the actual type if needed
  shared: boolean;
  hasSharedLink: boolean;
  startDate: string;
  endDate: string;
  assets: any[]; // You can replace this with the actual type if needed
  assetCount: number;
  isActivityEnabled: boolean;
  lastModifiedAssetTimestamp: string;
}

export interface ApiResponse {
  id?: string;
  success?: boolean;
  message?: string;
  error?: string;
  statusCode?: number;
}
