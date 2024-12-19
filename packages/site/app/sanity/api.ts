import type { Params } from "react-router";

import { client } from "./client";
import { MAIN_IMAGE_QUERY, POST_QUERY, POSTS_QUERY } from "./queries";

export async function fetchPost(params: Params) {
  const post = await client.fetch(POST_QUERY, params);
  return post;
}

export async function fetchMainImageForPost(params: Params) {
  const result = await client.fetch(MAIN_IMAGE_QUERY, params);

  return result?.mainImage;
}

export async function fetchPosts() {
  const posts = await client.fetch(POSTS_QUERY);
  return posts || [];
}
