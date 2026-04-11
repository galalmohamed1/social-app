import { API_BASE_URL } from "@/lib/utils";
import type { CreatePostResponse, Post, SuggestionUser, Users } from "@/types/Note";
import { useCallback } from "react";
function useNotesAPI() {

    const getProfileData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token: ", token);
      if (!token) {
        console.error("No token found");
        return null;
      }
      const response = await fetch(`${API_BASE_URL}/users/profile-data`, {
        method: "GET",
        headers: {
          token: token || "",
        },
      });

      const data:{data:{user:Users}} = await response.json();

      if (!response.ok) {
        console.log("Get profile data error:", data);
        return null;
      }
      

      return data.data.user;
    } catch (error) {
      console.log("Get profile data error:", error);
      return null;
    }
  },[]);

  const uploadPhoto = async (file: File) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token: ", token);

      if (!token) {
        console.error("No token found");
        return null;
      }

      const formData = new FormData();
      formData.append("photo", file);

      const response = await fetch(`${API_BASE_URL}/users/upload-photo`, {
        method: "PATCH",
        headers: {
          token: token,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("Upload photo error:", data);
        return null;
      }

      return data;
    } catch (error) {
      console.log("Upload photo error:", error);
      return null;
    }
  };

  const getSuggestions = useCallback(async (limit = 10) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE_URL}/users/suggestions?limit=${limit}`,
        {
          method: "GET",
          headers: {
            token: token || "",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log("Get suggestions error:", data);
        return null;
      }

      return data as {
        message?: string;
        users?: SuggestionUser[];
        suggestions?: SuggestionUser[];
      };
    } catch (error) {
      console.log("Get suggestions error:", error);
      return null;
    }
  },[]);

  const createPost = async (formData: FormData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      headers: {
        token: token || "",
      },
      body: formData,
    });

    const data: CreatePostResponse = await response.json();

    if (!response.ok) {
      console.log("Create post error:", data);
      return null;
    }

    return data.post;
  } catch (error) {
    console.log("Create post error:", error);
    return null;
  }
  };

  const getAllPosts =useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: "GET",
        headers: {
          token: token || "",
        }
      });
      const data:{data:{posts:Post[]}} = await response.json();
      if (!response.ok) {
        console.log("Get all posts error:", data);
        return null;
      }
      return data.data.posts;
    } catch (error) {
      console.log("Get all posts error:", error);
      return null;
    }
  },[]);
  
  const deletePost = async (postId : string) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          token: token || "",
        }
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("Delete post error:", data);
        return null;
      }

      return data;
    } catch (error) {
      console.log("Delete post error:", error);
      return null;
    }
  }

    return {getProfileData, uploadPhoto, getSuggestions, createPost, getAllPosts, deletePost};
}
export default useNotesAPI;
