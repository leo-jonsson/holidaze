"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
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
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../Dialog/Dialog";
import AvatarUpdateForm from "../../UpdateAvatar/UpdateAvatar";

export function Navbar() {
  const dispatch = useDispatch();
  const hasMounted = useHasMounted();
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const user = useUser();

  if (!hasMounted) return null;

  const handleSignOut = async () => {
    await signOut(dispatch);
    setIsOpen(false);
  };

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
          <Link href="/" className="text-xl font-bold">
            Holidaze
          </Link>
        </div>

        <div className="flex md:hidden items-center space-x-2">
          {user?.accessToken && <ProfilePicture user={user} size={8} />}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 pt-4">
                {user?.accessToken && (
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <ProfilePicture user={user} size={12} />
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                )}

                <Link
                  href="/"
                  className="text-base font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/venues"
                  className="text-base font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Venues
                </Link>

                {user?.accessToken && !user?.venueManager && (
                  <Link
                    href="/bookings"
                    className="relative text-base font-medium py-2 flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    My bookings
                    {user.bookings && user.bookings.length > 0 && (
                      <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                        {user.bookings.length}
                      </span>
                    )}
                  </Link>
                )}

                {user?.accessToken && user?.venueManager && (
                  <>
                    <Link
                      href="/venues/create"
                      className="text-base font-medium py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      List a venue
                    </Link>
                    <Link
                      href="/venues/user"
                      className="text-base font-medium py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Manage venues
                    </Link>
                  </>
                )}

                <div className="pt-4 border-t space-y-3">
                  {!user?.accessToken ? (
                    <>
                      <Link
                        href="/auth/login"
                        className={buttonVariants({
                          variant: "default",
                          className: "w-full",
                        })}
                        onClick={() => setIsOpen(false)}
                      >
                        Sign in
                      </Link>

                      <Link
                        href="/auth/register"
                        className={buttonVariants({
                          variant: "outline",
                          className: "w-full",
                        })}
                        onClick={() => setIsOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </>
                  ) : (
                    <>
                      <Dialog
                        open={isSettingsOpen}
                        onOpenChange={setIsSettingsOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full"
                            label="Settings"
                          />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogTitle>Update your avatar</DialogTitle>
                          <AvatarUpdateForm />
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        className="w-full"
                        label="Sign out"
                        onClick={handleSignOut}
                      />
                    </>
                  )}
                </div>
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
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="focus:bg-accent w-full  focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:bg-muted">
                      Settings
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Update your avatar</DialogTitle>
                    <AvatarUpdateForm />
                  </DialogContent>
                </Dialog>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={async () => await signOut(dispatch)}>
                  <button>Sign out</button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/venues/user">Manage venues</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}
