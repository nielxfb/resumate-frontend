"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { SheetMenu } from "@/components/base/protected/sheet-menu";
import { ClerkLoaded, useAuth, UserButton } from "@clerk/nextjs";
import { Coins } from "lucide-react";
import { useEffect, useState } from "react";
import { Icons } from "@/components/icons";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  const { userId } = useAuth();
  const [isFetching, setIsFetching] = useState(true);
  const [tokens, setTokens] = useState(0);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        // Fetch the token data
        let response = await fetch(`/api/service/token/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch token");
        }

        const data = await response.json();

        if (data.length === 0) {
          // If no data, create it
          response = await fetch(`/api/service/token/${userId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Failed to create token");
          }

          // Get the result after creation
          const createdData = await response.json();
          setTokens(createdData.tokenAmount);
        } else {
          // If data exists, set the token
          setTokens(data[0].tokenAmount);
        }
      } catch (error) {
        console.error("Error fetching or creating token:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchTransaction();
  }, [userId]);

  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 flex h-14 items-center sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center justify-end gap-x-6">
          <div className="flex items-center gap-x-2 text-xs font-bold">
            <Coins className="size-4" />
            {isFetching ? (
              <Icons.spinner className="size-4 animate-spin" />
            ) : (
              tokens
            )}
          </div>
          <ClerkLoaded>
            <UserButton
              userProfileUrl="/user-profile"
              userProfileMode="navigation"
            />
          </ClerkLoaded>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
