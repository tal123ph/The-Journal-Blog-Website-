import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
}

const Articles = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let query = supabase
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
        .order("created_at", { ascending: false });

      const { data: postsData } = await query;
      const { data: categoriesData } = await supabase.from("categories").select("*");

      if (postsData) setPosts(postsData as unknown as Post[]);
      if (categoriesData) setCategories(categoriesData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredPosts = selectedCategory
    ? posts.filter((p) => p.category?.slug === selectedCategory)
    : posts;

  // Demo posts
  const demoPosts = [
    {
      id: "demo-1",
      title: "The Future of Web Development",
      excerpt: "Explore the cutting-edge technologies shaping the future.",
      cover_image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
      category: { name: "Technology", slug: "technology" },
      author: { display_name: "Alex Morgan" },
      read_time: 8,
      created_at: new Date().toISOString(),
      featured: false,
    },
    {
      id: "demo-2",
      title: "Mindful Living in a Digital Age",
      excerpt: "Practical strategies for balance and well-being.",
      cover_image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
      category: { name: "Lifestyle", slug: "lifestyle" },
      author: { display_name: "Sarah Chen" },
      read_time: 5,
      created_at: new Date().toISOString(),
      featured: false,
    },
    {
      id: "demo-3",
      title: "Hidden Gems: Unexplored Destinations",
      excerpt: "Discover the world's most beautiful underrated destinations.",
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
      excerpt: "Integrating sustainability into core business strategies.",
      cover_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      category: { name: "Business", slug: "business" },
      author: { display_name: "Emma Wright" },
      read_time: 7,
      created_at: new Date().toISOString(),
      featured: false,
    },
    {
      id: "demo-5",
      title: "The Art of Minimalist Design",
      excerpt: "How less becomes more in modern design.",
      cover_image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
      category: { name: "Design", slug: "design" },
      author: { display_name: "Lisa Park" },
      read_time: 4,
      created_at: new Date().toISOString(),
      featured: false,
    },
    {
      id: "demo-6",
      title: "Remote Work Best Practices",
      excerpt: "Tips for staying productive while working from anywhere.",
      cover_image: "https://images.unsplash.com/photo-1521898284481-a5ec348cb555?w=800&q=80",
      category: { name: "Business", slug: "business" },
      author: { display_name: "Tom Baker" },
      read_time: 6,
      created_at: new Date().toISOString(),
      featured: false,
    },
  ];

  const displayPosts = posts.length > 0 ? filteredPosts : demoPosts;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-12 md:py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              All Articles
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of thoughtful articles on technology, lifestyle, travel, and more.
            </p>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-6 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !selectedCategory
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.slug
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center text-muted-foreground">Loading...</div>
            ) : displayPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayPosts.map((post) => (
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
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No articles found.</p>
              </div>
            )}
          </div>
        </section>

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
};

export default Articles;
