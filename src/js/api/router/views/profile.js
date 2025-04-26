
import { renderProfileCard } from "../../../utils/profileCard.js";
import { renderProfilePosts } from "../../../utils/renderProfile.js";

import { authGuard } from "../../storage/authGuard";

authGuard();
const profileContainer = document.getElementById("profile-Container");
const postContainer = document.getElementById("myPosts");

if (profileContainer) renderProfileCard(profileContainer);
if (postContainer) renderProfilePosts();