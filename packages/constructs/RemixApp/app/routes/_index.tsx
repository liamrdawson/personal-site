import { Link, useLoaderData } from "@remix-run/react";
import { SanityDocument } from "@sanity/client";

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
    <main className="grid">
      <section className="intro_section">
        <h2>Welcome</h2>
        <p>
          I&apos;m Liam Dawson. I build and optimise eCommerce websites for
          consumer brands and write about my experiences here.
        </p>
      </section>
      <section className="posts_section">
        <h3>Posts</h3>
        <ul>
          {posts.map((post) => (
            <li className="content_link" key={post._id}>
              <Link to={`/${post.slug.current}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
