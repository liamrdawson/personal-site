import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { type HeadersArgs } from "react-router";

import CodeBlock from "~/lib/components/CodeHighlight";
import { Grid } from "~/lib/components/Grid";
import { Heading } from "~/lib/components/Heading";
import { ImageGallery } from "~/lib/components/ImageGallery";
import { InlineCode } from "~/lib/components/InlineCode";
import { List } from "~/lib/components/List";
import PortableTextBlogImage from "~/lib/components/PortableTexBlogtImage";
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
        width: 900,
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
    "public, max-age=604800, stale-while-revalidate=2678400, immutable"
  );
  parentHeaders.append(
    "Netlify-CDN-Cache-Control",
    "public, max-age=2678400, stale-while-revalidate=2678400"
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
    emphasis: ({ children }) => <em>{children}</em>,
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
      <Heading level="h3" className="mt-64">
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
    blockquote: ({ children }) => (
      <Text
        as="blockquote"
        className="col-start-2 mt-paragraph"
        variant="quote"
      >
        {children}
      </Text>
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
