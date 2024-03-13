import { appConfig } from "@/config/appConfig";

export async function GetGenreListMovie() {
    try {
      const response = await fetch(
        `${appConfig.apiUrl}/genre/movie/list`,
        {
          next: { tags: ["getGenreListMovie"] },
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

  export async function GetGenreListTV() {
    try {
      const response = await fetch(
        `${appConfig.apiUrl}/genre/tv/list`,
        {
          next: { tags: ["getGenreListTv"] },
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