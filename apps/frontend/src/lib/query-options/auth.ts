import { queryOptions } from "@tanstack/react-query";

export const currentUserQueryOptions = () =>
  queryOptions({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("res");
        console.log(res);

        if (!res.ok) {
          return null;
        }

        const data = await res.json();

        return data.data;
      } catch (error) {
        console.error("Error fetching current user:", error);
        return null;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
