

import ProfileAPI from "../../api/profile/index.js";
import { load, save } from "../../api/storage/key.js";

const api = new ProfileAPI();
const user = load("user");
const username = user?.name || "defaultUsername"; 

export async function onUpdateProfile(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const bio = formData.get("bio");
  const avatarUrl = formData.get("avatar-url");
  const avatarAlt = formData.get("avatar-alt");
  const bannerUrl = formData.get("banner-url");
  const bannerAlt = formData.get("banner-alt");

  // Prepare the data for the update
  const updateData = { bio };

  if (avatarUrl) {
    updateData.avatar = {
      url: avatarUrl,
      alt: avatarAlt || "",
    };
  }

  if (bannerUrl) {
    updateData.banner = {
      url: bannerUrl,
      alt: bannerAlt || "",
    };
  }

 

  try {
    // Make the update API call with the dynamic username
    await api.profile.update(username, updateData);
    alert("Profile has been updated successfully.");
    window.location.reload(); // Optionally reload the page to reflect changes
  } catch (error) {
    console.error("Error updating profile:", error);
  }
  
}
