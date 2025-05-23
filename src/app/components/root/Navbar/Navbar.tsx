"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/app/components/common/Sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/common/DropdownMenu";
import Button from "@/app/components/common/Button";
import { buttonVariants } from "../../common/Button/Button";
import useUser from "@/app/hooks/useUser";
import { useHasMounted } from "@/app/hooks/useHasMounted";

export function Navbar() {
  const hasMounted = useHasMounted();
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();

  if (!hasMounted) return null;

  return (
    <nav className="sm:border bg-background sm:rounded-xl sticky sm:mt-5 sm:top-5 top-0 z-[999] h-[4rem]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            Logo
          </Link>
        </div>

        <div className="hidden md:flex md:items-center md:space-x-8">
          <Link
            href="/"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/venues"
            className="text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            Venues
          </Link>
        </div>

        <div className="flex md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 pt-4">
                <Link
                  href="/"
                  className="text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/venues"
                  className="text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Venues
                </Link>
                {!user?.accessToken ? (
                  <>
                    <Link
                      href="/"
                      className={buttonVariants({ variant: "default" })}
                    >
                      Sign in
                    </Link>

                    <Link
                      href="/"
                      className={buttonVariants({ variant: "outline" })}
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:flex md:items-center md:space-x-4">
          {!user?.accessToken && (
            <>
              <Link
                href="/auth/login"
                className={buttonVariants({ variant: "default" })}
              >
                Sign in
              </Link>

              <Link
                href="/auth/register"
                className={buttonVariants({ variant: "outline" })}
              >
                Sign Up
              </Link>
            </>
          )}
          {user?.accessToken && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" label={user.name} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {}}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}
