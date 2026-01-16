import { Link } from "react-router-dom";
import { Calendar, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PostCardProps {
  id: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  category?: string;
  author: string;
  readTime: number;
  createdAt: string;
  featured?: boolean;
}

const PostCard = ({
  id,
  title,
  excerpt,
  coverImage,
  category,
  author,
  readTime,
  createdAt,
  featured = false,
}: PostCardProps) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (featured) {
    return (
      <Link
        to={`/post/${id}`}
        className="group block relative overflow-hidden rounded-2xl bg-card shadow-card hover:shadow-elevated transition-all duration-300"
      >
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden aspect-video md:aspect-auto">
            <img
              src={coverImage || "/placeholder.svg"}
              alt={title}
              width={800}
              height={450}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
          </div>
          <div className="p-6 md:p-8 flex flex-col justify-center">
            {category && (
              <Badge variant="secondary" className="w-fit mb-4">
                {category}
              </Badge>
            )}
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors mb-4">
              {title}
            </h2>
            <p className="text-muted-foreground line-clamp-3 mb-6">{excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {readTime} min read
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/post/${id}`}
      className="group block bg-card rounded-xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden aspect-video">
        <img
          src={coverImage || "/placeholder.svg"}
          alt={title}
          width={800}
          height={450}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {category && (
          <Badge
            variant="secondary"
            className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm"
          >
            {category}
          </Badge>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{excerpt}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {author}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {readTime} min
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
