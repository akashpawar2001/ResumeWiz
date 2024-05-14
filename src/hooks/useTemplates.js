import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { getTamplates } from "../api";

const useTemplates = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "templates",
    async () => {
      try {
        const templates = await getTamplates();
        console.log(templates);
        return templates;
      } catch (err) {
        console.log(err);
        toast.error("Something Went Wrong");
      }
    },
    { refetchOnWindowFocus: false }
  );
  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

export default useTemplates;
