import { client } from "./lib/sanity";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Image from "next/image";
import HeroTitle from "./components/HeroTitle";

export const metadata = {
  title: "CraneoBlog",
  description:"DEV's also write",
}


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

  // Selecting the first post as the featured post
  const [featuredPost, ...recentPosts] = posts;

  return (
    <>
    <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Navbar />
      <HeroTitle />
      <main className="max-w-5xl mx-auto p-6">
        {/* Featured Post Section */}
        {featuredPost && (
          <section className="mb-10">
            <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden hover:font-bold hover:cursor-pointer">
              {featuredPost.mainImage?.asset?.url && (
                <Image
                  src={featuredPost.mainImage.asset.url}
                  alt={featuredPost.title}
                  width={962}
                  height={977}
                  className="w-full h-56 object-cover hover:font-bold hover:cursor-pointer"
                />
              )}

              <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-75 flex flex-col justify-end p-6 text-white">
                <h2 className="text-4xl font-bold mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-lg mb-2">{featuredPost.excerpt}</p>
                <p className="text-sm">
                  By {featuredPost.authorName} on{" "}
                  {new Date(featuredPost.publishedAt).toDateString()}
                </p>
              </div>
            </div>
          </section>
        )}

        <section>
          <h2 className="text-3xl font-bold mb-6">Latest Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:font-bold hover:cursor-pointer"
              >
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
            ))}
          </div>
        </section>
      </main>
      <Footer />
      </div>
      </>
  );
}
