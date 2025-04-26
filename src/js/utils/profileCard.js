


import ProfileAPI from "../api/profile/index.js";
import { load, save } from "../api/storage/key.js";
import { onUpdateProfile } from "../ui/profile/update.js";

const api = new ProfileAPI();

/**
 * Renders the profile card and attaches update logic.
 * @param {HTMLElement} container - The element where the profile will render.
 */
export async function renderProfileCard(container) {
  const user = load("user");

  if (!user || !user.name) {
    container.innerHTML = "<p>You must be logged in to view your profile.</p>";
    return;
  }

  try {
    const profile = await api.profile.read(user.name);

    container.innerHTML = `
      <div class="profile-card">
        <div class="banner">
          <img src="${profile.banner?.url || "https://placehold.co/600x150"}" alt="${profile.banner?.alt || ""}" />
        </div>
        <div class="avatar">
          <img src="${profile.avatar?.url || "https://placehold.co/100x100"}" alt="${profile.avatar?.alt || ""}" />
        </div>
        <h2>${profile.name}</h2>
        <p>${profile.bio || "No bio provided."}</p>

        <button id="editProfileBtn">Edit Profile</button>

        <form id="edit-profile-form" class="hidden">
          <textarea name="bio" id="bio" placeholder="Your bio...">${profile.bio || ""}</textarea>
          <input type="url" id="avatar-url" name="avatar-url" placeholder="Avatar URL" value="${profile.avatar?.url || ""}" />
          <input type="text" id="avatar-alt" name="avatar-alt" placeholder="Avatar Alt" value="${profile.avatar?.alt || ""}" />
          <input type="url" id="banner-url" name="banner-url" placeholder="Banner URL" value="${profile.banner?.url || ""}" />
          <input type="text" id="banner-alt" name="banner-alt" placeholder="Banner Alt" value="${profile.banner?.alt || ""}" />
          <button type="submit">Save Changes</button>
        </form>
      </div>
    `;

    // Toggle form visibility
    document.getElementById("editProfileBtn").addEventListener("click", () => {
      document.getElementById("edit-profile-form").classList.toggle("hidden");
    });

    // Hook up update handler
    document.getElementById("edit-profile-form").addEventListener("submit", onUpdateProfile);
  } catch (error) {
    console.error("Error loading profile:", error);
    container.innerHTML = "<p>Error loading profile data.</p>";
  }
}
