import { client } from "../lib/sanity";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

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
  const [ ...recentPosts] = posts;

  return (
    <div>
      <Navbar />
      <main className="max-w-5xl mx-auto p-6">

        <section>
          <h2 className="text-xl font-light mb-6">Just Recently</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mt-10 ">
            {recentPosts.map((post) => (
              <div
                key={post._id}
                className="hover:font-bold hover:cursor-pointer bg-white rounded-lg shadow-md overflow-hidden"
              >
                {post.mainImage?.asset?.url && (
                  <Image
                    src={post.mainImage.asset.url}
                    alt={post.title}
                    width={480} // Example width
                    height={320} // Example height
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm">By {post.authorName}</p>
                  <p className="text-gray-500 text-xs">
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
  );
}
