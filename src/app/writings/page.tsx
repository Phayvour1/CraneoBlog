import { client } from "../lib/sanity";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "My Stories",
  description: "DEV's also write",
};

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: {
    asset: {
      url: string;
    };
  };
  publishedAt: string;
  authorName: string;
  authorImage?: string;
  excerpt?: string;
}

async function fetchPosts(): Promise<Post[]> {
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc){
      _id,
      title,
      slug,
      mainImage{
        asset->{
          url
        },
      },
      publishedAt,
      "authorName": author->name,
      "authorImage": author->image.asset->url,
      excerpt
    }
  `);

  return posts;
}

export default async function Home() {
  const posts: Post[] = await fetchPosts();

  return (
    <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="max-w-5xl mx-auto p-6">
        {/* Articles Section */}
        <section>
          <h2 className="text-2xl font-light mb-10 p-6">just recently</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link href={`/post/${post.slug.current}`} key={post._id}>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  {post.mainImage?.asset?.url && (
                    <Image
                      src={post.mainImage.asset.url}
                      alt={post.title}
                      width={480}
                      height={320}
                      className="w-full h-48 object-cover"
                    />
                  )}

                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      By {post.authorName}
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 text-xs">
                      {new Date(post.publishedAt).toDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
