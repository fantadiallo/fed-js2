import SocialApi from "../api/socialApi/index.js";
import { currentUser } from "../api/storage/user.js";
import { createPostCard } from "./createdCard.js";


const api = new SocialApi();

/**
 * Renders all posts authored by the currently logged-in user.
 */
export async function renderProfilePosts() {
  const postList = document.getElementById("myPosts");
  const user = currentUser();

  if (!user) {
    postList.innerHTML = `<p class="error-message">You must be logged in to view your posts.</p>`;
    return;
  }

  try {
    const allPosts = await api.getAllPosts("?sort=created&sortOrder=desc&_author=true&_comments=true&_reactions=true");
    const userPosts = allPosts.filter(post => post.author?.name === user.name);

    if (!userPosts.length) {
      postList.innerHTML = `<p class="empty-message">You haven't created any posts yet.</p>`;
      return;
    }
    userPosts.forEach(post => {
      const card = createPostCard(post);
      postList.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to load posts:", error);
    postList.innerHTML = `<p class="error-message">Error loading your posts.</p>`;
  }
}
