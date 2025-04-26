import { onCreatePost } from "../../../ui/post/create.js";
import { authGuard } from "../../storage/authGuard.js";


authGuard();
const form = document.forms.CreatePet;

form.addEventListener("submit", onCreatePost)