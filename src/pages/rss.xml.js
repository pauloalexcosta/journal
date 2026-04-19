import rss from "@astrojs/rss";
import { SITE } from "@consts";
import { getCollection } from "astro:content";

export async function GET(context) {
  const blog = (await getCollection("blog"))
    .filter((post) => !post.data.draft)
    .sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf());

  return rss({
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
    })),
  });
}
