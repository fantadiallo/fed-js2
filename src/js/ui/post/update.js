import SocialApi from "../../api/socialApi";
const socialApi = new SocialApi();

/**
 * Handles the form submission to update an existing post.
 *
 * @param {Event} event - The form submission event.
 * @param {string} postId - The unique identifier of the post to update.
 * @returns {Promise<void>}
 */
export async function onUpdatePost(event, postId) {
  event.preventDefault();

  const formData = new FormData(event.target);

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
    await socialApi.updatePost(postId, postData);

    const messageBox = document.getElementById("successMessage");
    if (messageBox) {
      messageBox.classList.remove("hidden");

      setTimeout(() => {
        messageBox.classList.add("hidden");
        window.location.href = "/profile/index.html";
      }, 2500);
    } else {
      window.location.href = "/profile/index.html";
    }

  } catch (error) {
    console.error("Could not update post:", error);
    alert("Failed to update post.");
  }
}
