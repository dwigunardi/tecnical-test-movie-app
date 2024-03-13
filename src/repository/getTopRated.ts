import { appConfig } from "@/config/appConfig";

export async function GetTopRated({
    limit,
    page,
  }: {
    limit: number;
    page: number | string ;
  }) {
    try {
      const response = await fetch(
        `${appConfig.apiUrl}/movie/top_rated?language=en-US&page=${page}`,
        {
          next: { tags: ["getTopRated"] },
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