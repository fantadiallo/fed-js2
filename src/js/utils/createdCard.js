import { ROUTES } from "../api/storage/constans";
import { currentUser } from "../api/storage/user";
import { onDeletePost } from "../ui/post/delete";

/**
 * Creates a post card DOM element for displaying a post's details.
 * Includes Edit and Delete buttons if the current user is the author.
 *
 * @param {Object} post - The post data object.
 * @returns {HTMLElement} The constructed post card element.
 */
export function createPostCard(post) {
  const card = document.createElement("div");
  card.className = "post-card";

  const imageUrl = post.media?.url || "https://placehold.co/400x300";
  const imageAlt = post.media?.alt || post.title;
  const detailLink = `${ROUTES.POST_DETAILS}?id=${post.id}`;

  const user = currentUser();
  const isOwner = user?.name === post.author?.name;

  card.innerHTML = `
    <div class="card-content">
      <img src="${imageUrl}" alt="${imageAlt}" class="post-image"/>

      <div class="post-body">
        <h3 class="post-title">${post.title}</h3>
        <p class="post-text">${post.body}</p>

        <div class="post-tags">
          ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join(" ")}
        </div>

        <div class="post-meta">
          <span>${new Date(post.created).toLocaleDateString()}</span>
          <span>${post._count?.comments ?? 0} comments</span>
          <span>${post._count?.reactions ?? 0} reactions</span>
        </div>

        <a href="${detailLink}" class="view-post-btn">View Details</a>

        ${isOwner ? `
          <button class="edit-post-btn" data-id="${post.id}">Edit</button>
          <button class="delete-post-btn" data-id="${post.id}">Delete</button>
        ` : ""}
      </div>
    </div>
  `;

  if (isOwner) {
    const deleteBtn = card.querySelector(".delete-post-btn");
    deleteBtn.addEventListener("click", () => {
      const confirmDelete = confirm(`Are you sure you want to delete "${post.title}"?`);
      if (confirmDelete) {
        onDeletePost(post.id, card);
      }
    });

    const editBtn = card.querySelector(".edit-post-btn");
    editBtn.addEventListener("click", () => {
      document.getElementById("post-id").value = post.id;
      document.getElementById("post-title").value = post.title || "";
      document.getElementById("post-body").value = post.body || "";
      document.getElementById("tags").value = post.tags?.join(", ") || "";
      document.getElementById("image-url").value = post.media?.url || "";
      document.getElementById("image-alt").value = post.media?.alt || "";

      document.getElementById("editPostModal").classList.add("open");
    });
  }

  return card;
}
