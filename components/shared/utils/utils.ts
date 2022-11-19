import { Image } from "@/interfaces/event.interface";

function getCloudinaryImage(
  image: Image | undefined,
  format: "large" | "medium" | "small" | "thumbnail"
): string | undefined {
  let url: string | undefined = undefined;

  url = image?.data?.attributes.formats[format].url;

  return url;
}

function humanFormatDate(date: string) {
  return new Date(date).toISOString().slice(0, 10);
}

export { getCloudinaryImage, humanFormatDate };
