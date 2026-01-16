import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    const { error } = await supabase
      .from("subscribers")
      .insert({ email });

    if (error) {
      if (error.code === "23505") {
        toast({
          title: "Already subscribed!",
          description: "This email is already on our list.",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      setSubscribed(true);
      toast({
        title: "Welcome aboard!",
        description: "You've successfully subscribed to our newsletter.",
      });
    }
    setLoading(false);
  };

  return (
    <section className="py-16 md:py-24 min-h-[400px] md:min-h-[480px]">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-warm p-8 md:p-12 lg:p-16">
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/20 mb-6">
              <Mail className="h-8 w-8 text-primary-foreground" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Stay Inspired
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Get the latest articles, insights, and inspiration delivered straight to your inbox.
              No spam, just quality content.
            </p>
            
            {subscribed ? (
              <div className="flex items-center justify-center gap-2 text-primary-foreground">
                <Check className="h-6 w-6" />
                <span className="text-lg font-medium">You're subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground"
                  required
                />
                <Button
                  type="submit"
                  variant="secondary"
                  disabled={loading}
                  className="shrink-0"
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
