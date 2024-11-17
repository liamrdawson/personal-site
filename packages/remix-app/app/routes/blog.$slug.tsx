import { PortableText, PortableTextComponents } from "@portabletext/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import imageUrlBuilder from "@sanity/image-url";
import { defineQuery } from "groq";

import CodeBlock from "~/lib/components/CodeHighlight";
import { Grid } from "~/lib/components/Grid";
import { Heading } from "~/lib/components/Heading";
import { InlineCode } from "~/lib/components/InlineCode";
import { List } from "~/lib/components/List";
import PortableTextBlogImage from "~/lib/components/PortableTexBlogtImage";
import { Text } from "~/lib/components/Text";
import { TextLink } from "~/lib/components/TextLink";
import { client } from "~/sanity/client";

const POST_QUERY = defineQuery(
  `*[_type == "post" && slug.current == $slug][0]`,
);

export async function loader({ params, request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const post = await client.fetch(POST_QUERY, params);
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
    image: (props) => (
      <PortableTextBlogImage
        {...props}
        projectId={client.config().projectId}
        dataset={client.config().dataset}
      />
    ),
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
  const { post } = useLoaderData<typeof loader>();

  return (
    <main className="mt-layoutSection flex-1 text-dark">
      <Grid>
        <section className="col-span-6 col-start-1 md:col-span-12">
          <Heading level="h1">{post?.title}</Heading>
          {/* {mainImageUrl && (
            <img
              className="animate-fade-in my-textToImage opacity-0"
              src={mainImageUrl}
              alt={post?.title}
            />
          )} */}
          {Array.isArray(post?.body) && (
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
