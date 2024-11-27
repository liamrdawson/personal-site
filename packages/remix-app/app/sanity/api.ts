import { Params } from "@remix-run/react";

import { POST_QUERYResult } from "~/lib/cms/types";

import { client } from "./client";
import { POST_QUERY, POSTS_QUERY } from "./queries";

export async function fetchPost(params: Params) {
  const post: POST_QUERYResult = await client.fetch(POST_QUERY, params);
  return post;
}

export async function fetchPosts() {
  const posts: POST_QUERYResult[] = await client.fetch(POSTS_QUERY);
  return posts || [];
}
