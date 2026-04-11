import { API_BASE_URL } from "@/lib/utils";
import type { SignUpDTO, SignInData,  ChangePasswordData} from "@/types/Note";

 function useAuthAPI() {
    const signUp = async (note :SignUpDTO) => {
        try {
      const response = await fetch(`${API_BASE_URL}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });

      const data = await response.json();
    console.log("full response:", data);
    console.log("status:", response.status);

    if (!response.ok) {
      console.log("error response:", data);
      return null;
    }

    const token = data.token || data.data?.token;
    const user = data.user || data.data?.user;
    const message = data.message || "Login success";

    if (!token || !user) {
      console.log("Token or user not found in response");
      return null;
    }

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return {
      message,
      token,
      user,
    };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const signIn = async (note: SignInData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    const data = await response.json();
    console.log("full response:", data);
    console.log("status:", response.status);

    if (!response.ok) {
      console.log("error response:", data);
      return null;
    }

    const token = data.token || data.data?.token;
    const user = data.user || data.data?.user;
    const message = data.message || "Login success";

    if (!token || !user) {
      console.log("Token or user not found in response");
      return null;
    }

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return {
      message,
      token,
      user,
    };
  } catch (error) {
    console.log("signin error:", error);
    return null;
  }
};

  const changePassword = async (userData: ChangePasswordData) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/users/change-password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: token || "",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("Change password error:", data);
        return null;
      }

      return data;
    } catch (error) {
      console.log("Change password error:", error);
      return null;
    }
  };


  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return { signUp, signIn, changePassword , logOut };
}
export default useAuthAPI;