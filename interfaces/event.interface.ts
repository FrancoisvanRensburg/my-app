export interface IEvent {
  id: number;
  attributes: Attributes;
}
export interface Attributes {
  name: string;
  slug: string;
  venue: string;
  address: string;
  performers: string;
  date: string;
  time: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: null;
  provider: string;
  provider_metadata: ProviderMetadata;
  image?: Image;
}
export interface Data {
  id: number;
  attributes: Attributes;
}
export interface Thumbnail {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path?: null;
  width: number;
  height: number;
  size: number;
  url: string;
  provider_metadata: ProviderMetadata;
}
export interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}
export interface Formats {
  thumbnail: Thumbnail;
  small: Small;
  medium: Medium;
  large: Large;
}
export interface Small {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path?: null;
  width: number;
  height: number;
  size: number;
  url: string;
  provider_metadata: ProviderMetadata;
}
export interface Medium {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path?: null;
  width: number;
  height: number;
  size: number;
  url: string;
  provider_metadata: ProviderMetadata;
}
export interface Large {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path?: null;
  width: number;
  height: number;
  size: number;
  url: string;
  provider_metadata: ProviderMetadata;
}
export interface Image {
  data: Data;
}
