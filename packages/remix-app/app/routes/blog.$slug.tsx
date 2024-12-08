import { PortableText, PortableTextComponents } from "@portabletext/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import imageUrlBuilder from "@sanity/image-url";

import { AssetSlideWrapper } from "~/lib/components/AssetSlideWrapper";
import CodeBlock from "~/lib/components/CodeHighlight";
import { Grid } from "~/lib/components/Grid";
import { Heading } from "~/lib/components/Heading";
import { InlineCode } from "~/lib/components/InlineCode";
import { List } from "~/lib/components/List";
import PortableTextBlogImage from "~/lib/components/PortableTexBlogtImage";
import { Text } from "~/lib/components/Text";
import { TextLink } from "~/lib/components/TextLink";
import { fetchPost } from "~/sanity/api";
import { client } from "~/sanity/client";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const post = await fetchPost(params);
  const { projectId, dataset } = client.config();

  const mainImageUrl =
    post?.mainImage && projectId && dataset
      ? imageUrlBuilder({ projectId, dataset })
          .image(post.mainImage)
          .width(700)
          .height(583)
          .url()
      : null;

  return json({
    post,
    urlPath: url.pathname,
    mainImageUrl,
  });
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
  const { post, mainImageUrl } = useLoaderData<typeof loader>();

  return (
    <main className="mt-layoutSection flex-1 text-dark">
      <Grid>
        <section className="col-span-6 col-start-1 md:col-span-12">
          <Heading level="h1">{post?.title}</Heading>
          {mainImageUrl && (
            <div className="my-textToImage overflow-hidden">
              <AssetSlideWrapper>
                <img src={mainImageUrl} alt={post?.title} />
              </AssetSlideWrapper>
            </div>
          )}
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
