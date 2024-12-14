import { PortableTextTypeComponentProps } from "@portabletext/react";
import { getImageDimensions } from "@sanity/asset-utils";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "~/sanity/client";

import type { BlockContent } from "../cms/types";

type SecondType = Extract<BlockContent[number], { _type: "image" }>;

function urlFor(source: SanityImageSource) {
  const { projectId, dataset } = client.config();
  return projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
}

const PortableTextBlogImage = ({
  value,
}: PortableTextTypeComponentProps<SecondType>) => {
  if (!value.asset) {
    console.error("Asset data missing for image component", value);
    return null;
  }

  const { width, height } = getImageDimensions(value.asset);
  const imageUrl = urlFor(value);

  if (!imageUrl) {
    console.error("Failed to generate image URL", value);
    return null;
  }

  return (
    <img
      srcSet={`
        ${imageUrl?.width(200).auto("format").url()} 600w,
        ${imageUrl?.width(800).auto("format").url()} 800w,
        ${imageUrl?.width(1200).auto("format").url()} 1200w
      `}
      sizes="(max-width: 1200px) 100vw, 1200px"
      alt={value.alt}
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
