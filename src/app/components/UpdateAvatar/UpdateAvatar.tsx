"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // Adjust the import path to your Redux store
import { updateUserAvatar } from "@/redux/slice"; // Adjust the import path to your slice
import { updateUserAvatar as updateUserAvatarApi } from "@/api/user"; // Assuming you have this API function
import ProfilePicture from "@/app/components/common/ProfilePicture/ProfilePicture"; // Assuming you have this component
import Button from "@/app/components/common/Button"; // Assuming you have a Button component
import Typography from "@/app/components/common/Typography"; // Assuming you have a Typography component
import FileUploader from "../common/FileUploader";
import Label from "../common/Label";

const AvatarUpdateForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.app.user);

  const [newAvatarUrl, setNewAvatarUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldResetUploader, setShouldResetUploader] = useState(false);

  const handleUrlsChange = (urls: string[]) => {
    if (urls && urls.length > 0) {
      setNewAvatarUrl(urls[0]);
    } else {
      setNewAvatarUrl(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newAvatarUrl) {
      return;
    }

    if (!user) {
      return;
    }

    setIsLoading(true);
    setShouldResetUploader(false);

    try {
      const updatedUserData = await updateUserAvatarApi(
        { url: newAvatarUrl, alt: `${user.name}'s avatar` },
        user.name
      );

      if (updatedUserData && updatedUserData.data.avatar) {
        dispatch(updateUserAvatar(updatedUserData.data.avatar));
        setNewAvatarUrl(null);
        setShouldResetUploader(true);
      }
    } catch (err) {
      console.error("Error updating avatar:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-4 max-w-full items-center justify-center">
      {user && (
        <div className="flex items-center gap-4">
          <ProfilePicture user={user} size={10} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4 max-w-full">
        <Label>Choose New Avatar</Label>
        <FileUploader
          onUrlsChange={handleUrlsChange}
          endpoint="imageUploader"
          shouldReset={shouldResetUploader}
        />

        <Button
          type="submit"
          variant="outline"
          className="max-w-full"
          disabled={!newAvatarUrl || isLoading}
          label={isLoading ? "Updating..." : "Update Avatar"}
        />
      </form>
    </div>
  );
};

export default AvatarUpdateForm;
