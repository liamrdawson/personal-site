import { useLoaderData } from "@remix-run/react";

import { Grid } from "~/lib/components/Grid";
import { Heading } from "~/lib/components/Heading";
import { Text } from "~/lib/components/Text";

// const POST_QUERY = defineQuery(
//   `*[_type == "post" && slug.current == $slug][0]`,
// );

// export async function loader({ params }: LoaderFunctionArgs) {
//   return { post: await client.fetch(POST_QUERY, params) };
// }

// TODO: Setup to use Remix links for css.

export default function PostPage() {
  //   const { post } = useLoaderData<typeof loader>();

  return (
    <main className="mt-layoutSection flex-1 text-dark">
      <Grid>
        <section className="col-span-6 col-start-1 md:col-span-12">
          <Heading level={"h1"}>About</Heading>
          <Text variant="content" className="mt-paragraph">
            Hi, I&apos;m Liam.
          </Text>
          <Text variant="content" className="mt-paragraph">
            I&apos;m a husband, father, software engineer, and curious tinkerer.
          </Text>
          <Text variant="content" className="mt-paragraph">
            I was born and raised in North Wales and moved to London after
            university, initially working in the TV industry. I eventually found
            my passion in tech, becoming a full-stack software engineer with a
            specialty in eCommerce. Today, I’m based in Winchester, England,
            where I work on optimizing digital experiences for eCommerce brands.
          </Text>
          <Text variant="content" className="mt-paragraph">
            As a full-stack developer focused on eCommerce, I use technology to
            empower brands to maximise their potential. I’m fortunate to work in
            a field where innovation drives change, and I use my skills to
            enhance customer buying experiences while supporting brand growth
            and success.
          </Text>
          <Text variant="content" className="mt-paragraph">
            Here on my website, I aim to share thoughts and learnings from my
            journey in eCommerce. From industry trends to personal insights, I
            enjoy jotting down ideas that might be valuable for others.
          </Text>
          <Text variant="content" className="mt-paragraph">
            Outside of work, my favourite things are spending time with my
            family, photography, and, on occasion, exercise.
          </Text>
        </section>
      </Grid>
    </main>
  );
}
