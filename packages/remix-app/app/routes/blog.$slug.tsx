import { PortableText, PortableTextComponents } from "@portabletext/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";

import CodeBlock from "~/lib/components/CodeHighlight";
import { Grid } from "~/lib/components/Grid";
import { Heading } from "~/lib/components/Heading";
import { InlineCode } from "~/lib/components/InlineCode";
import { List } from "~/lib/components/List";
import PortableTextBlogImage from "~/lib/components/PortableTexBlogtImage";
import { SlidingImage } from "~/lib/components/SlidingImage";
import { Text } from "~/lib/components/Text";
import { TextLink } from "~/lib/components/TextLink";
import { getSanityImageUrl } from "~/lib/utils/getSanityImageUrl";
import { fetchMainImageForPost, fetchPost } from "~/sanity/api";

export async function loader({ params, request }: LoaderFunctionArgs) {
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

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.post?.title },
    { property: "og:description", content: data?.post?.description },
    { property: "og:title", content: data?.post?.title },
    { property: "og:image", content: data?.mainImageUrl },
    { property: "og:url", content: `https://liamrdawson.com${data?.urlPath}` },
  ];
};

const portableTextComponents: PortableTextComponents = {
  types: {
    image: (props) => <PortableTextBlogImage {...props} />,
    code: ({ value }) => <CodeBlock value={value} />,
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

export default function PostPage() {
  const { post, mainImage } = useLoaderData<typeof loader>();

  return (
    <main className="mt-layoutSection flex-1 text-dark">
      <Grid>
        <section className="col-span-6 col-start-1 md:col-span-12">
          <Heading level="h1">{post?.title}</Heading>
          <div className="my-textToImage overflow-hidden">
            {mainImage && (
              <SlidingImage
                src={getSanityImageUrl({
                  source: mainImage,
                  width: 700,
                  height: 500,
                })}
                alt={mainImage.alt}
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
