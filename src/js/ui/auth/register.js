import AuthAPI from "../../api/auth";
const api = new AuthAPI;

export async function onRegister(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const user = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const result = await api.auth.register(user);
    console.log("Registration successful", result);

    alert("🎉 Registration successful! login please");

    setTimeout(() => {
      window.location.href = "/auth/login/index.html";
    }, 1500);
  } catch (error) {
    console.error("Error during registration:", error);
    alert("Registration failed. Please try again.");
  }
}