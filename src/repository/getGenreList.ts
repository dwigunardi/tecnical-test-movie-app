import { appConfig } from "@/config/appConfig";

export async function GetGenreList() {
    try {
      const response = await fetch(
        `${appConfig.apiUrl}/genre/movie/list`,
        {
          next: { tags: ["getGenreList"] },
          cache: "force-cache",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'accept': 'application/json',
            'Authorization': `Bearer ${appConfig.appAccessToken}`
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return {
        message: "something went wrong",
        error,
      };
    }
  }