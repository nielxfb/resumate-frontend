import Link from "next/link";

export function Footer() {
  return (
    <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 flex h-14 items-center md:mx-8">
        <p className="select-none text-left text-xs leading-loose text-muted-foreground md:text-sm">
          Built by&nbsp;
          <a
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            SROOMY Team
          </a>
          .
        </p>
      </div>
    </div>
  );
}
