import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const blogPosts = await getCollection('blog');
	const experimentPosts = await getCollection('experiments');
	const combinedPosts = [...blogPosts, ...experimentPosts];
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: combinedPosts.map((post) => ({
			...post.data,
			link: post.collection === 'blog' ? `/blog/${post.id}/` : `/experiments/${post.id}/`,
		})),
	});
}
