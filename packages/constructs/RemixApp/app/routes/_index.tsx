import { useLoaderData } from "@remix-run/react";
import { SanityDocument } from "@sanity/client";

import { ContentLink } from "~/lib/components/ContentLink";
import { Grid } from "~/lib/components/Grid";
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
        <section className="col-span-6 col-start-1 md:col-span-8 md:col-start-3 xl:col-span-6 xl:col-start-4">
          <h1 className="font-heading text-h1 font-h1 leading-h1 tracking-h1">
            Welcome
          </h1>
          <p className="mt-h1 font-content text-body leading-body tracking-body">
            I&apos;m Liam Dawson. I build and optimise eCommerce websites for
            consumer brands and write about my experiences here.
          </p>
        </section>
        <section className="mt-pageSection posts_section col-span-6 col-start-1 md:col-span-8 md:col-start-3 xl:col-start-4">
          <h2 className="mt-te font-heading text-h2 font-h2 leading-h2 tracking-h2">
            Posts
          </h2>
          <ul className="mt-h2 list-disc space-y-4 pl-sm font-content text-body leading-body tracking-body">
            {posts.map((post) => (
              <>
                <li className="w-fit" key={post._id}>
                  <ContentLink to={`/${post.slug.current}`}>
                    {post.title}
                  </ContentLink>
                </li>
              </>
            ))}
          </ul>
        </section>
      </Grid>
    </main>
  );
}
