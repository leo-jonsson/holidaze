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

interface NavbarProps {
  user?: {
    signedIn: boolean;
    name?: string;
    image?: string;
  };
  onSignIn?: () => void;
  onSignUp?: () => void;
  onSignOut?: () => void;
}

export function Navbar({ user, onSignIn, onSignUp, onSignOut }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            Logo
          </Link>
        </div>

        {/* Desktop Navigation */}
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
                {!user?.signedIn ? (
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
                      onSignOut?.();
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
          {!user?.signedIn ? (
            <>
              <Button variant="ghost" onClick={onSignIn}>
                Sign In
              </Button>
              <Button onClick={onSignUp}>Sign Up</Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  Test
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onSignOut}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}
