import { client } from "@/app/lib/sanity";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import BackButton from "@/app/components/BackButton"; // Optional back button

interface Post {
  title: string;
  mainImage?: { asset: { url: string } };
  publishedAt: string;
  body: PortableTextBlock[]; // More specific type can be used, e.g., PortableText type
  authorName: string;
}

async function fetchPost(slug: string): Promise<Post | null> {
  const post = await client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0]{
      title,
      mainImage{
        asset->{
          url
        },
      },
      publishedAt,
      body,
      "authorName": author->name
    }
    `,
    { slug }
  );
  return post;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PostPage(props: Props) {
  const params = await props.params;
  const { slug } = params;
  const post = await fetchPost(slug);

  if (!post) {
    return notFound(); 
  }

  return (
    <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="max-w-5xl mx-auto p-6">
        <BackButton />

        <header className="mb-6">
          <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            By {post.authorName} on {new Date(post.publishedAt).toDateString()}
          </p>
        </header>

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

        <article className="prose dark:prose-invert">
          {/* Render the PortableText content */}
          <PortableText value={post.body} />
        </article>
      </main>
      <Footer />
    </div>
  );
}
