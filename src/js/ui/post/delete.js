import SocialApi from "../../api/socialApi";

const api = new SocialApi();

export async function onDeletePost(postId){
    try{
        await api.deletePost(postId);
        console.log("post deleted sucssesfully");
        window.location.href = "/posts";  
    } catch (error){
        console.error("failed to delete the post ", error)
        alert("Could not delete the post. Please try again.");
    }
  }
