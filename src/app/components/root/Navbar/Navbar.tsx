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
import { signOut } from "@/api/auth";
import { useDispatch } from "react-redux";
import ProfilePicture from "../../common/ProfilePicture";

export function Navbar() {
  const dispatch = useDispatch();
  const hasMounted = useHasMounted();
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();

  if (!hasMounted) return null;

  return (
    <nav className="sm:border bg-background sm:rounded-full max-w-[45rem] mx-auto sticky sm:mt-5 sm:top-5 top-0 z-50 h-[4rem] md:shadow-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="hidden md:flex md:items-center md:space-x-8">
          <Link href="/" className="text-xl font-bold">
            Holidaze
          </Link>

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
          {user?.accessToken && !user?.venueManager && (
            <Link
              href="/bookings"
              className="relative text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              My bookings
              {user.bookings && user.bookings.length > 0 && (
                <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                  {user.bookings.length}
                </span>
              )}
            </Link>
          )}
          {user?.accessToken && user?.venueManager && (
            <Link
              href="/venues/create"
              className="relative text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              List a venue
            </Link>
          )}
        </div>

        <div className="flex md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden">
                <Menu className="h-5 w-5" />
              </button>
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
                    label="Sign Out"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  ></Button>
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
                <button>
                  <ProfilePicture user={user} size={8} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={async () => await signOut(dispatch)}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}
