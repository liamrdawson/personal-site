import { PortableTextTypeComponentProps } from "@portabletext/react";
import { getImageDimensions } from "@sanity/asset-utils";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "~/sanity/client";

import type { SanityImageAsset } from "../cms/types";

const PortableTextBlogImage = ({
  value,
}: PortableTextTypeComponentProps<SanityImageAsset>) => {
  const { width, height } = getImageDimensions(value);
  const { projectId, dataset } = client.config();

  const urlFor = (source: SanityImageSource) =>
    projectId && dataset
      ? imageUrlBuilder({ projectId, dataset }).image(source)
      : null;

  return (
    <img
      srcSet={`
        ${urlFor(value)?.width(200).auto("format").url()} 600w,
        ${urlFor(value)?.width(800).auto("format").url()} 800w,
        ${urlFor(value)?.width(1200).auto("format").url()} 1200w
      `}
      sizes="(max-width: 1200px) 100vw, 1200px"
      alt={value.altText}
      loading="eager"
      className="my-textToImage"
      style={{
        display: "block",
        width: "100%",
        aspectRatio: `${width} / ${height}`,
        objectFit: "cover",
      }}
    />
  );
};

export default PortableTextBlogImage;
