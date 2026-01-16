import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  name: string;
  slug: string;
  count?: number;
  className?: string;
}

const CategoryBadge = ({ name, slug, count, className }: CategoryBadgeProps) => {
  return (
    <Link
      to={`/category/${slug}`}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full",
        "bg-secondary text-secondary-foreground",
        "hover:bg-primary hover:text-primary-foreground",
        "transition-colors duration-200 font-medium text-sm",
        className
      )}
    >
      {name}
      {count !== undefined && (
        <span className="text-xs opacity-70">({count})</span>
      )}
    </Link>
  );
};

export default CategoryBadge;
