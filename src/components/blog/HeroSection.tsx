import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-subtle -z-10" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground mb-8 animate-fade-up">
            <BookOpen className="h-4 w-4" />
            <span className="text-sm font-medium">Explore ideas that matter</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Stories, Insights &{" "}
            <span className="text-gradient">Perspectives</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Discover thoughtful articles from writers around the world. 
            Join our community of curious minds exploring technology, lifestyle, and beyond.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button size="lg" onClick={() => navigate("/articles")}>
              Start Reading
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/auth?mode=signup")}>
              Become a Writer
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
