import image1 from "/assets/1-281006880034-liamrdawsonweb.jpg";
import image2 from "/assets/2-281006880033-liamrdawsonweb.jpg";
import image3 from "/assets/3-281006880035-liamrdawsonweb.jpg";
import { Grid } from "~/lib/components/Grid";
import { Heading } from "~/lib/components/Heading";
import { Text } from "~/lib/components/Text";

export default function AboutPage() {
  return (
    <main className="mt-layoutSection flex-1 text-dark">
      <Heading level={"h1"}>About</Heading>
      <Grid>
        <img src={image1} className="col-start-1 col-end-5 my-textToImage" />
        <img src={image2} className="col-start-5 col-end-9 my-textToImage" />
        <img src={image3} className="col-start-9 col-end-13 my-textToImage" />
        <section className="col-span-6 col-start-1 md:col-span-12">
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
