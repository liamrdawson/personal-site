import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "~/sanity/client";

export function getSanityImageUrl({
  source,
  width,
  height,
}: {
  source: SanityImageSource;
  width: number;
  height: number;
}) {
  const url = imageUrlBuilder(client)
    .image(source)
    .width(width)
    .height(height)
    .auto("format")
    .url();

  return url;
}
