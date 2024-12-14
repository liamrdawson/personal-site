import { Params } from "react-router";

import {
  MAIN_IMAGE_QUERYResult,
  POST_QUERYResult,
  POSTS_QUERYResult,
} from "~/lib/cms/types";

import { client } from "./client";
import { MAIN_IMAGE_QUERY, POST_QUERY, POSTS_QUERY } from "./queries";

export async function fetchPost(params: Params) {
  const post: POST_QUERYResult = await client.fetch(POST_QUERY, params);
  return post;
}

export async function fetchMainImageForPost(params: Params) {
  const result: MAIN_IMAGE_QUERYResult = await client.fetch(
    MAIN_IMAGE_QUERY,
    params,
  );

  return result?.mainImage;
}

export async function fetchPosts() {
  const posts: POSTS_QUERYResult = await client.fetch(POSTS_QUERY);
  return posts || [];
}
