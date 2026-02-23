import {
  type HeadersArgs,
  type MetaFunction,
  useLoaderData,
} from "react-router";

import { Grid } from "~/lib/components/Grid";
import { Heading } from "~/lib/components/Heading";
import { List } from "~/lib/components/List";
import { Text } from "~/lib/components/Text";
import { TextLink } from "~/lib/components/TextLink";
import { fetchPosts } from "~/sanity/api";

export async function loader() {
  const posts = await fetchPosts();
  return {
    posts,
  };
}

export function headers({ parentHeaders }: HeadersArgs) {
  parentHeaders.append(
    "Cache-Control",
    "public, max-age=604800, stale-while-revalidate=2678400, immutable",
  );
  parentHeaders.append(
    "Netlify-CDN-Cache-Control",
    "public, max-age=2678400, stale-while-revalidate=2678400",
  );
  return parentHeaders;
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
      property: "description",
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
      content: "en_GB",
    },
    { property: "og:type", content: "website" },
  ];
};

export default function IndexPage() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <main className="mt-layoutSection flex-1 text-dark selection:bg-text selection:text-background">
      <Grid>
        <div className="col-span-12 col-start-1">
          <section>
            <Heading level="h1">Welcome</Heading>
            <Text
              variant={"content"}
              className="mt-paragraph animate-fade-in opacity-100"
            >
              I&apos;m Liam Dawson. I build and optimise websites and business
              software for consumer brands and write about my experiences here.
            </Text>
          </section>
          <section className="mt-pageSection">
            <Heading level="h2">Posts</Heading>
            <List style="ul" className="mt-h2 animate-fade-in opacity-0">
              {posts.length &&
                posts.map(
                  (post) =>
                    post && (
                      <li className="w-fit" key={post._id}>
                        <TextLink
                          prefetch="viewport"
                          to={`blog/${post.slug.current}`}
                          variant="content"
                        >
                          {post.title}
                        </TextLink>
                      </li>
                    ),
                )}
            </List>
          </section>
        </div>
      </Grid>
    </main>
  );
}
