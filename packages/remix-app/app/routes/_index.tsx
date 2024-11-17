import { MetaFunction, useLoaderData } from "@remix-run/react";
import { SanityDocument } from "@sanity/client";

import { Grid } from "~/lib/components/Grid";
import { Heading } from "~/lib/components/Heading";
import { List } from "~/lib/components/List";
import { Text } from "~/lib/components/Text";
import { TextLink } from "~/lib/components/TextLink";
import { client } from "~/sanity/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

export async function loader() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY);
  return { posts: posts || [] }; // Ensure posts is always an array
}

export const meta: MetaFunction = () => {
  return [
    {
      title: "Liam Dawson",
    },
    {
      property: "og:title",
      content: "Home - Liam Dawson",
    },
    {
      property: "og:description",
      content: "The writings of Liam Dawson, Full Stack eCommerce Developer",
    },
    {
      property: "og:title",
      content: "Liam Dawson",
    },
    {
      property: "og:url",
      content: "https://liamrdawson.com/",
    },
    {
      property: "og:site_name",
      content: "Liam Dawson",
    },
    {
      property: "og:locale",
      content: "en-GB",
    },
  ];
};

export default function IndexPage() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <main className="mt-layoutSection flex-1 text-dark">
      <Grid>
        <div className="col-span-6 col-start-1 md:col-span-12">
          <section>
            <Heading level="h1">Welcome</Heading>
            <Text
              variant={"content"}
              className="animate-fade-in mt-paragraph opacity-0"
            >
              I&apos;m Liam Dawson. I build and optimise eCommerce websites for
              consumer brands and write about my experiences here.
            </Text>
          </section>
          <section className="mt-pageSection">
            <Heading level="h2">Posts</Heading>
            <List style="ul" className="animate-fade-in mt-h2 opacity-0">
              {posts.length &&
                posts.map((post) => (
                  <li className="w-fit" key={post._id}>
                    <TextLink
                      prefetch="viewport"
                      to={`blog/${post.slug.current}`}
                      variant="content"
                    >
                      {post.title}
                    </TextLink>
                  </li>
                ))}
            </List>
          </section>
        </div>
      </Grid>
    </main>
  );
}
