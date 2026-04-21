import { API_BASE_URL } from "@/lib/utils";
import type { CreateFollowResponse, CreatePostResponse, NotificationCount, NotificationItem, Post,  SuggestionUser, Users } from "@/types/Note";
import { useCallback } from "react";
function useNotesAPI() {

    const getMyProfileData = useCallback(async () => {
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
    const getUserProfileData = useCallback(async (userId:string) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token: ", token);
      if (!token) {
        console.error("No token found");
        return null;
      }
      const response = await fetch(`${API_BASE_URL}/users/${userId}/profile`, {
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

    const data:{data:CreatePostResponse} = await response.json();

    if (!response.ok) {
      console.log("Create post error:", data);
      return null;
    }
    
    
    return data.data.post;
  } catch (error) {
    console.log("Create post error:", error);
    return null;
  }
  };

  const getAllPosts =useCallback(async (
  only: "all" | "me" | "following" = "all",
  page = 1,
  limit = 5
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_BASE_URL}/posts/feed?only=${only}&page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          token: token || "",
        },
      }
    );

    const data:{data:{posts:Post[]}} = await response.json();
      if (!response.ok) {
        console.log("Get all posts error:", data);
        return [];
      }
      return data.data.posts;
  } catch (error) {
    console.log("Get all posts error:", error);
    return [];
  }
},[]);
  const getAllPostsProfile =useCallback(async (userId:string) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_BASE_URL}/users/${userId}/posts`,
      {
        method: "GET",
        headers: {
          token: token || "",
        },
      }
    );

    const data:{data:{posts:Post[]}} = await response.json();
      if (!response.ok) {
        console.log("Get all posts error:", data);
        return [];
      }
      return data.data.posts;
  } catch (error) {
    console.log("Get all posts error:", error);
    return [];
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

  const likePost = async (postId : string) => {
    try{
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/posts/${postId}/like`,{
        method: "PUT",
        headers: {
          token: token || "",
        }
      });
      const data = await response.json();

      if (!response.ok) {
        console.log("save post error:", data);
        return null;
      }

      return data;
    } catch (error) {
      console.log("Delete post error:", error);
      return null;
    }
    
  } 
  const savePost = async (postId : string) => {
    try{
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/posts/${postId}/bookmark`,{
        method: "PUT",
        headers: {
          token: token || "",
        }
      });
      const data = await response.json();

      if (!response.ok) {
        console.log("save post error:", data);
        return null;
      }

      return data;
    } catch (error) {
      console.log("Delete post error:", error);
      return null;
    }
    
  } 


  const sharePost = async (postId: string, body: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/share`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token || "",
      },
      body: JSON.stringify({ body }),
    });

    const data:{data:CreatePostResponse} = await response.json();

    if (!response.ok) {
      console.log("Share post error:", data);
      return null;
    }

    return data.data.post;
  } catch (error) {
    console.log("Share post error:", error);
    return null;
  }
};

const getSinglePost = async (postId: string) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: "GET",
      headers: {
        token: token || "",
      },
    });

    const data:{data:CreatePostResponse} = await response.json();

    if (!response.ok) {
      console.log("Get single post error:", data);
      return null;
    }

    return data.data.post;
  } catch (error) {
    console.log("Get single post error:", error);
    return null;
  }
};

const updatePost = async (postId: string, body: string, privacy: string) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token || "",
      },
      body: JSON.stringify({
        body,
        privacy,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("Update post error:", data);
      return null;
    }

    return data.data?.post || data.post || data;
  } catch (error) {
    console.log("Update post error:", error);
    return null;
  }
};

const getNotifications =useCallback( async (page = 1, limit = 60) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_BASE_URL}/notifications?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          token: token || "",
        },
      }
    );

    const data: { data: { notifications: NotificationItem[] } } =
      await response.json();

    if (!response.ok) {
      console.log("Get notifications error:", data);
      return [];
    }

    return data.data.notifications;
  } catch (error) {
    console.log("Get notifications error:", error);
    return [];
  }
},[]);
const readNotificationOnly = useCallback(async (notificationId: string) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_BASE_URL}/notifications/${notificationId}/read`,
      {
        method: "PATCH",
        headers: {
          token: token || "",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log("Mark notification read error:", data);
      return false;
    }

    return true;
  } catch (error) {
    console.log("Mark notification read error:", error);
    return false;
  }
}, []);

const markAllNotificationsRead = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/notifications/read-all`, {
      method: "PATCH",
      headers: {
        token: token || "",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("Mark all notifications read error:", data);
      return false;
    }

    return true;
  } catch (error) {
    console.log("Mark all notifications read error:", error);
    return false;
  }
};

const getNotificationCount = useCallback(async()=>{
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_BASE_URL}/notifications/unread-count`,
      {
        method: "GET",
        headers: {
          token: token || "",
        },
      }
    );

    const data: { data:  NotificationCount } = await response.json();

    if (!response.ok) {
      console.log("Get notifications error:", data);
      return 0;
    }

    return data.data.unreadCount;
  } catch (error) {
    console.log("Get notifications error:", error);
    return 0;
  }
},[]);

const followAndUnfollow = async (userId:string)=>{
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}users/${userId}/follow`, {
      method: "PUT",
      headers: {
        token: token || "",
      },
    });

    const data:{data:CreateFollowResponse} = await response.json();

    if (!response.ok) {
      console.log("Get single post error:", data);
      return null;
    }

    return data.data.following;
  } catch (error) {
    console.log("Get single post error:", error);
    return null;
  }
}

const getComments = async (postId: string, page = 1, limit = 10) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_BASE_URL}/posts/${postId}/comments?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          token: token || "",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log("Get comments error:", data);
      return [];
    }

    return data.data?.comments || data.comments || [];
  } catch (error) {
    console.log("Get comments error:", error);
    return [];
  }
};

const createComment = async (postId: string, body: string) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token || "",
      },
      body: JSON.stringify({ body }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("Create comment error:", data);
      return null;
    }

    return data.data?.comment || data.comment || data;
  } catch (error) {
    console.log("Create comment error:", error);
    return null;
  }
};

const updateComment = async (postId: string, commentId: string, body: string) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_BASE_URL}/posts/${postId}/comments/${commentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token || "",
        },
        body: JSON.stringify({ body }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log("Update comment error:", data);
      return null;
    }

    return data.data?.comment || data.comment || data;
  } catch (error) {
    console.log("Update comment error:", error);
    return null;
  }
};

const deleteComment = async (postId: string, commentId: string) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_BASE_URL}/posts/${postId}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          token: token || "",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log("Delete comment error:", data);
      return null;
    }

    return data;
  } catch (error) {
    console.log("Delete comment error:", error);
    return null;
  }
};

const likeComment = async (postId: string, commentId: string) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_BASE_URL}/posts/${postId}/comments/${commentId}/like`,
      {
        method: "PUT",
        headers: {
          token: token || "",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log("Like comment error:", data);
      return null;
    }

    return data.data?.comment || data.comment || data;
  } catch (error) {
    console.log("Like comment error:", error);
    return null;
  }
};

const getReplies = async (
  postId: string,
  commentId: string,
  page = 1,
  limit = 10
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_BASE_URL}/posts/${postId}/comments/${commentId}/replies?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          token: token || "",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log("Get replies error:", data);
      return [];
    }

    return data.data?.replies || data.replies || [];
  } catch (error) {
    console.log("Get replies error:", error);
    return [];
  }
};

const createReply = async (postId: string, commentId: string, body: string) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_BASE_URL}/posts/${postId}/comments/${commentId}/replies`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token || "",
        },
        body: JSON.stringify({ body }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log("Create reply error:", data);
      return null;
    }

    return data.data?.reply || data.reply || data.data?.comment || data;
  } catch (error) {
    console.log("Create reply error:", error);
    return null;
  }
};


    return {
      getMyProfileData,
      getUserProfileData
      ,uploadPhoto,
      getSuggestions, 
      createPost, 
      getAllPosts, 
      deletePost, 
      likePost, 
      savePost,
      sharePost, 
      getSinglePost, 
      updatePost,
      getNotifications,
      getNotificationCount,
      readNotificationOnly,
      markAllNotificationsRead,
      getAllPostsProfile,
      followAndUnfollow,
      getComments,
      createComment,
      updateComment,
      deleteComment,
      likeComment,
      getReplies,
      createReply,
     };
}
export default useNotesAPI;
