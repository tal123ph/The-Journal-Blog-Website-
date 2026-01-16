import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Newsletter from "@/components/blog/Newsletter";
import { Users, BookOpen, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                About <span className="text-gradient">TheJournal</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                We're a community of passionate writers and curious readers, exploring
                ideas that shape our world.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground text-center mb-12">
                To create a space where thoughtful perspectives can flourish, where
                diverse voices can be heard, and where readers can discover stories
                that inspire, educate, and challenge their thinking.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-card rounded-xl shadow-soft">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    Community First
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We believe in the power of community and diverse perspectives.
                  </p>
                </div>

                <div className="text-center p-6 bg-card rounded-xl shadow-soft">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    Quality Content
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Every article is crafted with care, depth, and authenticity.
                  </p>
                </div>

                <div className="text-center p-6 bg-card rounded-xl shadow-soft">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    Global Reach
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Writers and readers from around the world share their stories.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>

      <Footer />
    </div>
  );
};

export default About;
