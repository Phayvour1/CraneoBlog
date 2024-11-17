import { client } from "@/app/lib/sanity";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import { notFound } from "next/navigation";
import BackButton from "@/app/components/BackButton"; // BackButton Component
import { PortableText } from "@portabletext/react"; // For rendering Portable Text

interface Post {
  title: string;
  slug: { current: string };
  mainImage?: { asset: { url: string } };
  publishedAt: string;
  body: any; // Portable Text content
  authorName: string;
  authorImage?: string;
}

async function fetchPost(slug: string): Promise<Post | null> {
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      slug,
      mainImage{
        asset->{
          url
        },
      },
      publishedAt,
      body,
      "authorName": author->name,
      "authorImage": author->image.asset->url
    }`,
    { slug }
  );
  return post;
}

interface Props {
  params: { slug: string };
}

export default async function PostPage({ params }: Props) {
  const { slug } = params;  // No need to await params here
  const post = await fetchPost(slug);

  if (!post) {
    return notFound();
  }

  return (
    <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="max-w-5xl mx-auto p-6">
        {/* Back Button */}
        <BackButton />

        {/* Post Header */}
        <header className="mb-6">
          <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            By {post.authorName} on {new Date(post.publishedAt).toDateString()}
          </p>
        </header>

        {/* Post Image */}
        {post.mainImage?.asset?.url && (
          <div className="mb-6">
            <Image
              src={post.mainImage.asset.url}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}

        {/* Post Body */}
        <article className="prose dark:prose-invert">
          <PortableText value={post.body} />
        </article>
      </main>
      <Footer />
    </div>
  );
}
