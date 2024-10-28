import { PortableText, PortableTextComponents } from "@portabletext/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import imageUrlBuilder from "@sanity/image-url";
import { defineQuery } from "groq";

import PortableTextBlogImage from "~/lib/components/PortableTexBlogtImage";
import { client } from "~/sanity/client";

const POST_QUERY = defineQuery(
  `*[_type == "post" && slug.current == $slug][0]`
);

export async function loader({ params }: LoaderFunctionArgs) {
  return { post: await client.fetch(POST_QUERY, params) };
}

export default function PostPage() {
  const { post } = useLoaderData<typeof loader>();
  const { projectId, dataset } = client.config();

  const postImageUrl =
    post?.mainImage && projectId && dataset
      ? imageUrlBuilder({ projectId, dataset })
          .image(post.mainImage)
          ?.width(550)
          .height(310)
          .url()
      : null;

  const components: PortableTextComponents = {
    types: {
      image: (props) => (
        <PortableTextBlogImage
          {...props}
          projectId={projectId}
          dataset={dataset}
        />
      ),
    },
  };

  return (
    <main className="grid">
      <section className="intro_section">
        <h1 className="text-4xl font-bold mb-8">{post?.title}</h1>
        {postImageUrl && (
          <img
            src={postImageUrl}
            alt={post?.title}
            className="aspect-video rounded-xl"
            width="550"
            height="310"
          />
        )}
        {Array.isArray(post?.body) && (
          <PortableText value={post.body} components={components} />
        )}
      </section>
    </main>
  );
}
