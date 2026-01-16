import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/blog/HeroSection";
import PostCard from "@/components/blog/PostCard";
import CategoryBadge from "@/components/blog/CategoryBadge";
import Newsletter from "@/components/blog/Newsletter";
import { supabase } from "@/integrations/supabase/client";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  read_time: number | null;
  created_at: string;
  featured: boolean | null;
  category: { name: string; slug: string } | null;
  author: { display_name: string } | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

const Index = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch published posts with category and author
      const { data: postsData } = await supabase
        .from("posts")
        .select(`
          id,
          title,
          slug,
          excerpt,
          cover_image,
          read_time,
          created_at,
          featured,
          category:categories(name, slug),
          author:profiles(display_name)
        `)
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(7);

      // Fetch categories
      const { data: categoriesData } = await supabase
        .from("categories")
        .select("*")
        .limit(5);

      if (postsData) setPosts(postsData as unknown as Post[]);
      if (categoriesData) setCategories(categoriesData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const featuredPost = posts.find((p) => p.featured);
  const recentPosts = posts.filter((p) => !p.featured).slice(0, 6);

  // Demo posts for empty state
  const demoPosts = [
    {
      id: "demo-1",
      title: "The Future of Web Development: Trends to Watch in 2024",
      excerpt: "Explore the cutting-edge technologies and methodologies shaping the future of web development, from AI-powered tools to new frameworks.",
      cover_image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
      category: { name: "Technology", slug: "technology" },
      author: { display_name: "Alex Morgan" },
      read_time: 8,
      created_at: new Date().toISOString(),
      featured: true,
    },
    {
      id: "demo-2",
      title: "Mindful Living in a Digital Age",
      excerpt: "Discover practical strategies for maintaining balance and well-being in our increasingly connected world.",
      cover_image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
      category: { name: "Lifestyle", slug: "lifestyle" },
      author: { display_name: "Sarah Chen" },
      read_time: 5,
      created_at: new Date().toISOString(),
      featured: false,
    },
    {
      id: "demo-3",
      title: "Hidden Gems: Unexplored Destinations for 2024",
      excerpt: "From remote islands to mountain villages, discover the world's most beautiful underrated travel destinations.",
      cover_image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
      category: { name: "Travel", slug: "travel" },
      author: { display_name: "Marco Rivera" },
      read_time: 6,
      created_at: new Date().toISOString(),
      featured: false,
    },
    {
      id: "demo-4",
      title: "Building a Sustainable Business Model",
      excerpt: "Learn how forward-thinking companies are integrating sustainability into their core business strategies.",
      cover_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      category: { name: "Business", slug: "business" },
      author: { display_name: "Emma Wright" },
      read_time: 7,
      created_at: new Date().toISOString(),
      featured: false,
    },
  ];

  const displayPosts = posts.length > 0 ? posts : demoPosts;
  const displayFeatured = featuredPost || demoPosts[0];
  const displayRecent = posts.length > 0 ? recentPosts : demoPosts.slice(1);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />

        {/* Categories */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <CategoryBadge
                  key={category.id}
                  name={category.name}
                  slug={category.slug}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {!loading && displayFeatured && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
                Featured Story
              </h2>
              <PostCard
                id={displayFeatured.id}
                title={displayFeatured.title}
                excerpt={displayFeatured.excerpt || ""}
                coverImage={displayFeatured.cover_image || undefined}
                category={displayFeatured.category?.name}
                author={displayFeatured.author?.display_name || "Anonymous"}
                readTime={displayFeatured.read_time || 5}
                createdAt={displayFeatured.created_at}
                featured
              />
            </div>
          </section>
        )}

        {/* Recent Posts */}
        {!loading && displayRecent.length > 0 && (
          <section className="py-12 md:py-16 bg-gradient-subtle">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
                Latest Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayRecent.map((post) => (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    excerpt={post.excerpt || ""}
                    coverImage={post.cover_image || undefined}
                    category={post.category?.name}
                    author={post.author?.display_name || "Anonymous"}
                    readTime={post.read_time || 5}
                    createdAt={post.created_at}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
