import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Icons } from "@/components/icons";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 py-3 backdrop-blur-lg backdrop-filter dark:border-gray-900">
      <div className="container mx-auto flex justify-between">
        <div className="flex items-center gap-x-8">
          <Link
            href="/"
            className="flex select-none items-center gap-x-2 font-bold text-primary dark:text-primary-foreground"
          >
            <Icons.sroomarizer className="size-10 fill-primary dark:fill-primary-foreground" />
            Sroomarizer
          </Link>
        </div>
        <div className="flex items-center gap-x-4 text-sm font-medium">
          <span className="hidden md:block">
            The Perfect Way to Get Your Resume Graded 📝 🎓 ✨
          </span>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
