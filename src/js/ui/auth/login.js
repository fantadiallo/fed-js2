import AuthAPI from "../../api/auth";

const api = new AuthAPI();

export async function onLogin(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  const user = {
    email: formData.get("email")?.trim(),
    password: formData.get("password"), // ✅ CORRECTED
  };

  console.log("login request body:", user);

  if (!user.email || !user.password) {
    alert("Email and password are required.");
    return;
  }

  try {
    const response = await api.auth.login(user);

    if (response && response.name) {
      console.log("Login successful:", response);
      form.reset();
      alert(`Login successful for ${response.name}`);
      window.location.href = "/profile/";
    } else {
      throw new Error("Invalid login response. Please try again.");
    }
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed: " + error.message);
  }
}
