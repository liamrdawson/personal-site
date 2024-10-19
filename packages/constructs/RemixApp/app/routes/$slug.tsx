import { PortableText } from "@portabletext/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getImageDimensions } from "@sanity/asset-utils";
import { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { client } from "~/sanity/client";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

export async function loader({ params }: LoaderFunctionArgs) {
  return { post: await client.fetch<SanityDocument>(POST_QUERY, params) };
}

// Barebones lazy-loaded image component
const SampleImageComponent = ({ value, isInline }) => {
  const { width, height } = getImageDimensions(value);

  return (
    <img
      srcSet={`
      ${urlFor(value)?.width(200).auto("format").url()} 600w,
      ${urlFor(value)?.width(800).auto("format").url()} 800w,
      ${urlFor(value)?.width(1200).auto("format").url()} 1200w
      `}
      sizes="(max-width: 1200px) 100vw, 1200px"
      alt={value.alt || " "}
      loading="lazy"
      style={{
        display: "block",
        width: "100%",
        // Avoid jumping around with aspect-ratio CSS property
        aspectRatio: 4 / 3,
        objectFit: "cover",
      }}
    />
  );
};

const components = {
  types: {
    image: SampleImageComponent,
    // Any other custom types you have in your content
    // Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.
  },
};

export default function PostPage() {
  const { post } = useLoaderData<typeof loader>();
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;

  console.log(post);

  return (
    <main className="grid">
      <section className="intro_section">
        <h2 className="text-4xl font-bold mb-8">{post.title}</h2>
        {Array.isArray(post.body) && (
          <PortableText value={post.body} components={components} />
        )}
      </section>
      {postImageUrl && (
        <img
          src={postImageUrl}
          alt={post.title}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}
    </main>
  );
}
