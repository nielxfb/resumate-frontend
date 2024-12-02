import Link from "next/link";
import { MenuIcon, PanelsTopLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Menu } from "@/components/base/protected/menu";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Icons } from "@/components/icons";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full flex-col px-3 sm:w-72" side="left">
        <SheetHeader>
          <Button
            className="flex items-center !justify-start pb-2 pt-1"
            variant="link"
            asChild
          >
            <Link
              href="/dashboard"
              className="flex items-center gap-2 !no-underline"
            >
              <Icons.sroomarizer className="mr-1 size-10 h-6 w-6 fill-primary dark:fill-primary-foreground" />
              <SheetTitle className="text-lg font-bold text-primary dark:text-white">
                Sroomarizer
              </SheetTitle>
              <SheetDescription>
                <VisuallyHidden.Root>AI Resume Analyzer</VisuallyHidden.Root>
              </SheetDescription>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
