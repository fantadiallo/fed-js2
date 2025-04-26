
import SocialApi from "../../api/socialApi.js";
import { ROUTES } from "../../api/storage/constans.js";
import { load } from "../../api/storage/key.js";

const socialApi = new SocialApi();
const user = load("user");

/**
 * Handles the submission of the post creation form.
 * Gathers form data, constructs a post object, sends it to the API,
 * and redirects the user upon success.
 *
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>}
 */
export async function onCreatePost(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  const postData = {
    title: formData.get("title"),
    body: formData.get("body"),
    tags: formData.get("tags")?.split(",").map(tag => tag.trim()) || [],
    media: {
      url: formData.get("image-url"),
      alt: formData.get("image-alt"),
    },
  };

  try {
    const createdPost = await socialApi.createPost(postData);
    alert("Post created successfully!");
    form.reset();
    window.location.href = "/profile/";
  } catch (error) {
    console.error("Error creating post:", error);
    alert("Failed to create post. Please try again.");
  }
}
