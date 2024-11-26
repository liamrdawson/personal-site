import { POST_QUERYResult } from "~/lib/cms/types";

import { client } from "./client";
import { POSTS_QUERY } from "./queries";

export async function fetchPosts() {
  const posts: POST_QUERYResult[] = await client.fetch(POSTS_QUERY);
  return posts || [];
}
