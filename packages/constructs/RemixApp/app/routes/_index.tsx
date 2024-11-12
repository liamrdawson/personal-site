import { useLoaderData } from "@remix-run/react";
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
  return { posts: await client.fetch<SanityDocument[]>(POSTS_QUERY) };
}

export default function IndexPage() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <main className="mt-layoutSection flex-1 text-dark">
      <Grid>
        <div className="col-span-6 col-start-1 md:col-span-12">
          <section>
            <Heading level="h1">Welcome</Heading>
            <Text variant={"content"} className="mt-paragraph">
              I&apos;m Liam Dawson. I build and optimise eCommerce websites for
              consumer brands and write about my experiences here.
            </Text>
          </section>
          <section className="mt-pageSection">
            <Heading level="h2">Posts</Heading>
            <List style="ul" className="mt-h2">
              {posts.map((post) => (
                <li className="w-fit" key={post._id}>
                  <TextLink
                    prefetch="viewport"
                    to={`/${post.slug.current}`}
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
