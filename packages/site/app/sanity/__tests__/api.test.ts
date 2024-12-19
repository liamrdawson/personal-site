import { describe, expect, it, vi } from "vitest";

import { fetchPost, fetchPosts } from "../api";
import { client } from "../client";
import { POST_QUERY, POSTS_QUERY } from "../queries";

vi.mock("../client", () => ({
  client: {
    fetch: vi.fn(),
  },
}));

describe("fetchPosts", () => {
  it("should call client.fetch with the correct query", async () => {
    await fetchPosts();
    expect(client.fetch).toHaveBeenCalledWith(POSTS_QUERY);
  });
});

describe("fetchPost", () => {
  it("should call client.fetch with the correct query", async () => {
    const mockParams = {
      slug: "__SLUG__",
    };
    await fetchPost(mockParams);
    expect(client.fetch).toHaveBeenLastCalledWith(POST_QUERY, mockParams);
  });
});
