import { useLoaderData } from "@remix-run/react";
import { SanityDocument } from "@sanity/client";

import { Grid } from "~/lib/components/Grid";
import { Heading } from "~/lib/components/Heading";
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
        <div className="col-span-6 col-start-1 md:col-span-8 md:col-start-3 xl:col-span-6 xl:col-start-4">
          <section>
            <Heading level={1}>Welcome</Heading>
            <Text variant={"content"} className="mt-h1">
              I&apos;m Liam Dawson. I build and optimise eCommerce websites for
              consumer brands and write about my experiences here.
            </Text>
          </section>
          <section className="mt-pageSection">
            <Heading level={2}>Posts</Heading>
            <ul className="mt-h2 list-disc space-y-4 pl-sm font-content text-body leading-body tracking-body">
              {posts.map((post) => (
                <li className="w-fit" key={post._id}>
                  <TextLink to={`/${post.slug.current}`} variant="content">
                    {post.title}
                  </TextLink>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Grid>
    </main>
  );
}
