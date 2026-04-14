import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
  className?: string;
}

const OptionCard = ({
  icon: Icon,
  title,
  description,
  onClick,
  className,
}: OptionCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex flex-col items-start gap-4 p-8 bg-card border-2 border-border rounded-2xl",
        "shadow-card transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-2",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        "text-left w-full",
        className
      )}
    >
      <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
        <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
      </div>
      <div className="space-y-2">
        <h3 className="font-display font-semibold text-xl text-foreground">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <div className="mt-auto pt-4">
        <span className="text-primary font-medium group-hover:underline">
          Select this option →
        </span>
      </div>
    </button>
  );
};

export default OptionCard;
