import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Newsletter from "@/components/blog/Newsletter";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import DOMPurify from "dompurify";

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  cover_image: string | null;
  read_time: number | null;
  created_at: string;
  category: { name: string; slug: string } | null;
  author: { display_name: string; bio: string | null } | null;
}

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      const { data } = await supabase
        .from("posts")
        .select(`
          id,
          title,
          content,
          excerpt,
          cover_image,
          read_time,
          created_at,
          category:categories(name, slug),
          author:profiles(display_name, bio)
        `)
        .eq("id", id)
        .single();

      if (data) setPost(data as unknown as Post);
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  // Demo post for empty state
  const demoPost: Post = {
    id: "demo-1",
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt: "Explore the cutting-edge technologies and methodologies shaping the future of web development.",
    content: `
      <p>The web development landscape continues to evolve at a rapid pace. As we move through 2024, several key trends are reshaping how we build and interact with web applications.</p>
      
      <h2>AI-Powered Development Tools</h2>
      <p>Artificial intelligence is no longer just a buzzword in web development. Tools powered by AI are now helping developers write better code faster, debug issues more efficiently, and even generate entire components from natural language descriptions.</p>
      
      <h2>The Rise of Edge Computing</h2>
      <p>Edge computing is transforming how we think about web performance. By processing data closer to the user, we can achieve faster load times and more responsive applications.</p>
      
      <h2>WebAssembly Goes Mainstream</h2>
      <p>WebAssembly is finally hitting its stride, enabling high-performance applications that were previously impossible in the browser. From video editing to 3D gaming, the possibilities are expanding rapidly.</p>
      
      <h2>Conclusion</h2>
      <p>The future of web development is bright and full of possibilities. By staying informed about these trends and continuously learning, developers can position themselves at the forefront of innovation.</p>
    `,
    cover_image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80",
    category: { name: "Technology", slug: "technology" },
    author: { display_name: "Alex Morgan", bio: "Senior Web Developer and Tech Writer" },
    read_time: 8,
    created_at: new Date().toISOString(),
  };

  const displayPost = post || demoPost;

  const formattedDate = new Date(displayPost.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <article className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            {/* Back Link */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to articles
            </Link>

            {/* Header */}
            <header className="max-w-3xl mx-auto text-center mb-8">
              {displayPost.category && (
                <Badge variant="secondary" className="mb-4">
                  {displayPost.category.name}
                </Badge>
              )}
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                {displayPost.title}
              </h1>
              <div className="flex items-center justify-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {displayPost.author?.display_name || "Anonymous"}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {displayPost.read_time || 5} min read
                </span>
              </div>
            </header>

            {/* Cover Image */}
            {displayPost.cover_image && (
              <div className="max-w-4xl mx-auto mb-12">
                <img
                  src={displayPost.cover_image}
                  alt={displayPost.title}
                  className="w-full h-auto rounded-2xl shadow-card"
                />
              </div>
            )}

            {/* Content - Sanitized to prevent XSS */}
            <div
              className="prose prose-lg max-w-3xl mx-auto prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary"
              dangerouslySetInnerHTML={{ 
                __html: DOMPurify.sanitize(displayPost.content, {
                  ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'br', 'span', 'div', 'img'],
                  ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'class', 'id'],
                  ALLOW_DATA_ATTR: false
                })
              }}
            />

            {/* Author Bio */}
            {displayPost.author && (
              <div className="max-w-3xl mx-auto mt-12 p-6 bg-secondary/50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">
                      {displayPost.author.display_name}
                    </h3>
                    {displayPost.author.bio && (
                      <p className="text-muted-foreground text-sm">{displayPost.author.bio}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </article>

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
};

export default PostPage;
