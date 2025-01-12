import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { type HeadersArgs } from "react-router";

import type { Gallery } from "~/lib/cms/types";
import CodeBlock from "~/lib/components/CodeHighlight";
import { Grid } from "~/lib/components/Grid";
import { Heading } from "~/lib/components/Heading";
import { InlineCode } from "~/lib/components/InlineCode";
import { List } from "~/lib/components/List";
import PortableTextBlogImage, {
  urlFor,
} from "~/lib/components/PortableTexBlogtImage";
import { SlidingImage } from "~/lib/components/SlidingImage";
import { Text } from "~/lib/components/Text";
import { TextLink } from "~/lib/components/TextLink";
import { getSanityImageUrl } from "~/lib/utils/getSanityImageUrl";
import { fetchMainImageForPost, fetchPost } from "~/sanity/api";

import type { Route } from "./+types/blogPost";

export async function loader({ params, request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const post = await fetchPost(params);
  const mainImage = await fetchMainImageForPost(params);

  const mainImageUrl = mainImage
    ? getSanityImageUrl({
        source: mainImage,
        width: 700,
        height: 500,
      })
    : null;

  return {
    post,
    urlPath: url.pathname,
    mainImageUrl,
    mainImage,
  };
}

export function headers({ parentHeaders }: HeadersArgs) {
  parentHeaders.append(
    "Cache-Control",
    "max-age=600, s-max-age=2678400, stale-while-revalidate=31540000"
  );
  return parentHeaders;
}

export const meta = ({ data }: Route.MetaArgs) => {
  return [
    { title: data?.post?.title },
    { property: "og:description", content: data?.post?.description },
    { property: "description", content: data?.post?.description },
    { property: "og:title", content: data?.post?.title },
    { property: "og:image", content: data?.mainImageUrl },
    { property: "og:url", content: `https://liamrdawson.com${data?.urlPath}` },
    { property: "og:locale", content: "en_GB" },
    { property: "og:type", content: "article" },
  ];
};

interface ImageGalleryProps {
  value: Gallery;
}

const ImageGallery = ({ value }: ImageGalleryProps) => {
  console.log(value.images?.[0].alt);

  return (
    <Grid className="gallery-grid-container">
      {value.images?.map((im, index) => {
        if (!im.asset) {
          return null;
        }

        return (
          <div className={`gallery-grid-image-${index} gallery-grid-area`}>
            <img
              srcSet={`
                  ${urlFor(im)?.width(200).auto("format").url()} 600w,
                  ${urlFor(im)?.width(800).auto("format").url()} 800w,
                  ${urlFor(im)?.width(1200).auto("format").url()} 1200w
                `}
              sizes="(max-width: 1200px) 100vw, 1200px"
              loading="lazy"
              alt={im.alt}
            />
          </div>
        );
      })}
    </Grid>
  );
};

const portableTextComponents: PortableTextComponents = {
  types: {
    image: (props) => <PortableTextBlogImage {...props} />,
    code: ({ value }) => <CodeBlock value={value} />,
    gallery: ({ value }) => <ImageGallery value={value} />,
  },
  list: {
    bullet: ({ children }) => <List style="ul">{children}</List>,
    number: ({ children }) => <List style="ol">{children}</List>,
  },
  marks: {
    link: ({ value, children }) => (
      <TextLink prefetch="none" to={value.href} variant="content">
        {children}
      </TextLink>
    ),
    code: ({ children }) => <InlineCode>{children}</InlineCode>,
    strong: ({ children }) => (
      <strong className="font-strong">{children}</strong>
    ),
  },
  block: {
    normal: ({ children }) => (
      <Text variant="content" className="mt-paragraph">
        {children}
      </Text>
    ),
    h1: ({ children }) => (
      <Heading level="h1" className="mt-pageSection">
        {children}
      </Heading>
    ),
    h2: ({ children }) => (
      <Heading level="h2" className="mt-pageSection">
        {children}
      </Heading>
    ),
    h3: ({ children }) => (
      <Heading level="h3" className="mt-pageSection">
        {children}
      </Heading>
    ),
    h4: ({ children }) => (
      <Heading level="h4" className="mt-64">
        {children}
      </Heading>
    ),
    h5: ({ children }) => (
      <Heading level="h5" className="mt-paragraph">
        {children}
      </Heading>
    ),
  },
};

export default function PostPage({ loaderData }: Route.ComponentProps) {
  const { post, mainImage } = loaderData;

  return (
    <main className="mt-layoutSection flex-1 text-dark selection:text-background selection:bg-text">
      <Grid>
        <section className="col-start-1 col-span-12">
          <Heading level="h1">{post?.title}</Heading>
          <div className="my-textToImage overflow-hidden">
            {mainImage && (
              <SlidingImage
                src={getSanityImageUrl({
                  source: mainImage,
                  width: 700,
                  height: 500,
                })}
                alt={
                  mainImage.asset?.altText ??
                  "The main image for this blog post"
                }
              />
            )}
          </div>
          {post?.body && (
            <div className="animate-fade-in opacity-0">
              <PortableText
                value={post.body}
                components={portableTextComponents}
              />
            </div>
          )}
        </section>
      </Grid>
    </main>
  );
}
