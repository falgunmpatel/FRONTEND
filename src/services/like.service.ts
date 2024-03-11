import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const videoLikes = async (videoId: string) => {
  try {
    const response = await axios.get(`${baseUrl}/likes/video/${videoId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error("Error getting video likes: " + error);
  }
};

export const togglingLike = async (videoId: string) => {
  try {
    const response = await axios.post(
      `${baseUrl}/likes/toggle/v/${videoId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error("Error toggling like: " + error);
  }
};
