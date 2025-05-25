"use client";
import UserVenues from "@/app/components/UserVenues/UserVenues";
import useUser from "@/app/hooks/useUser";
import React from "react";

const UserVenuesPage = () => {
  const user = useUser();

  if (!user) return <div>Could not find user</div>;

  return (
    <div>
      <UserVenues username={user?.name} />
    </div>
  );
};

export default UserVenuesPage;
