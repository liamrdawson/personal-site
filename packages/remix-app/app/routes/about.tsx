import { LinksFunction } from "react-router";

import image1 from "/assets/1-281006880034-liamrdawsonweb.jpg";
import image2 from "/assets/2-281006880033-liamrdawsonweb.jpg";
import image3 from "/assets/3-281006880035-liamrdawsonweb.jpg";
import { Grid } from "~/lib/components/Grid";
import { Heading } from "~/lib/components/Heading";
import { SlidingImage } from "~/lib/components/SlidingImage";
import { Text } from "~/lib/components/Text";

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

export default function AboutPage() {
  return (
    <main className="mt-layoutSection flex-1 text-dark">
      <Heading level={"h1"}>About</Heading>
      <Grid>
        <div className="col-start-1 col-end-3 my-textToImage hidden aspect-[4/5] min-[500px]:block md:col-end-5">
          <SlidingImage
            src={image1}
            alt={
              "A blurry black and white 35mm photo of Liam smiling at the camera"
            }
          />
        </div>
        <div className="col-start-1 col-end-7 my-textToImage aspect-[4/5] min-[500px]:col-start-3 min-[500px]:col-end-5 md:col-start-5 md:col-end-9">
          <SlidingImage
            src={image2}
            alt={"A black and white 35mm photos of Liam smiling at the camera"}
          />
        </div>
        <div className="col-start-5 col-end-7 my-textToImage hidden aspect-[4/5] min-[500px]:block md:col-start-9 md:col-end-13">
          <SlidingImage
            src={image3}
            alt={
              "A blurry black and white 35mm photos of Liam smiling at the camera"
            }
          />
        </div>
        <section className="col-span-6 col-start-1 animate-fade-in opacity-0 md:col-span-12">
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
