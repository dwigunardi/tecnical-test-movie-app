import { appConfig } from "@/config/appConfig";

export async function SearchMovie({
    query,
    page,
  }: {
    query?: string;
    page: number | string;
  }) {
    try {
      const response = await fetch(
        `${appConfig.apiUrl}/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
        {
          next: { tags: ["searchMovie"] },
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