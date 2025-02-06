import { type HeadersArgs, type LinksFunction } from "react-router";

import image1 from "/assets/1-281006880034-liamrdawsonweb.jpg";
import image2 from "/assets/2-281006880033-liamrdawsonweb.jpg";
import image3 from "/assets/3-281006880035-liamrdawsonweb.jpg";
import { Grid } from "~/lib/components/Grid";
import { Heading } from "~/lib/components/Heading";
import { SlidingImage } from "~/lib/components/SlidingImage";
import { Text } from "~/lib/components/Text";

export function headers({ parentHeaders }: HeadersArgs) {
  parentHeaders.append(
    "Cache-Control",
    "public, max-age=604800, stale-while-revalidate=2678400, immutable"
  );
  parentHeaders.append(
    "Netlify-CDN-Cache-Control",
    "public, max-age=2678400, stale-while-revalidate=2678400"
  );
  return parentHeaders;
}

export const links: LinksFunction = () => {
  return [
    {
      rel: "prefetch",
      as: "image",
      href: image1,
      media: "(min-width: 500px)",
    },
    {
      rel: "prefetch",
      as: "image",
      href: image2,
    },
    {
      rel: "prefetch",
      as: "image",
      href: image3,
      media: "(min-width: 500px)",
    },
  ];
};

export const meta = () => {
  return [
    { title: "Liam Dawson | About" },
    {
      property: "og:description",
      content: "About Liam Dawson: husband, father, software engineer.",
    },
    {
      property: "description",
      content: "About Liam Dawson: husband, father, software engineer",
    },
    { property: "og:title", content: "Liam Dawson | About" },
    { property: "og:image", content: image2 },
    { property: "og:url", content: `https://liamrdawson.com/about` },
    { property: "og:site_name", content: "Liam Dawson" },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: "en_GB" },
  ];
};

export default function AboutPage() {
  return (
    <main className="mt-layoutSection flex-1 text-dark selection:text-background selection:bg-text">
      <Heading level={"h1"}>About</Heading>
      <Grid>
        <div className="my-textToImage hidden aspect-[4/5] min-[500px]:block col-start-1 col-end-5">
          <SlidingImage
            src={image1}
            alt={
              "A blurry black and white 35mm photo of Liam smiling at the camera"
            }
          />
        </div>
        <div className="my-textToImage aspect-[4/5] col-start-1 min-[500px]:col-start-5 min-[500px]:col-end-9 col-end-13">
          <SlidingImage
            src={image2}
            alt={"A black and white 35mm photos of Liam smiling at the camera"}
          />
        </div>
        <div className="my-textToImage hidden aspect-[4/5] min-[500px]:block col-start-9 col-end-13">
          <SlidingImage
            src={image3}
            alt={
              "A blurry black and white 35mm photos of Liam smiling at the camera"
            }
          />
        </div>
        <section className="col-span-12 col-start-1 animate-fade-in opacity-0">
          <Text variant="content" className="mt-paragraph">
            Hi, I&apos;m Liam.
          </Text>
          <Text variant="content" className="mt-paragraph">
            I&apos;m a husband, father, software engineer, and curious tinkerer.
          </Text>
          <Text variant="content" className="mt-paragraph">
            Born and raised in North Wales, I initially worked in the TV
            industry in London after university, but soon found my true passion
            in tech. Now based in Winchester, England, I specialise in
            full-stack eCommerce development, helping brands optimise their
            digital experiences to drive growth and deliver outstanding customer
            journeys.
          </Text>
          <Text variant="content" className="mt-paragraph">
            I use technology to empower brands to maximise their potential. I’m
            fortunate to work in a field where innovation drives change, and I
            use my skills to enhance customer buying experiences while
            supporting brand growth and success.
          </Text>
          <Text variant="content" className="mt-paragraph">
            On this site, I share insights and learnings from my journey in
            eCommerce. From industry trends to personal insights, I enjoy
            jotting down ideas that might be valuable for others.
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
