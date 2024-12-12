import { defineQuery } from "groq";

export const POST_QUERY = defineQuery(
  `*[_type == "post" && slug.current == $slug][0]`,
);

export const MAIN_IMAGE_QUERY = defineQuery(
  `*[_type == "post" && slug.current == $slug][0]{mainImage}`,
);

export const POSTS_QUERY = defineQuery(
  `*[
    _type == "post"
    && defined(slug.current)
  ]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`,
);
