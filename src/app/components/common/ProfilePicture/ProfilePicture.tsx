import { User } from "@/api/types/user";
import React from "react";

type Props = {
  user: User;
  size?: number;
};

const ProfilePicture: React.FC<Props> = ({ user, size = 5 }) => {
  return (
    <div className={`block rounded-full size-${size} aspect-square`}>
      <img
        src={user.avatar?.url}
        alt={user.avatar?.alt}
        className="size-full rounded-full object-cover"
      />
    </div>
  );
};

export default ProfilePicture;
