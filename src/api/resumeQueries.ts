import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/api";

export const useCreateResumeQuery = () => {
  return useQuery<any, any>({
    queryKey: ["createResume"],
    queryFn: createResume,
  });
};

const createResume = async (): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/cv");
    return data;
  } catch (error: any) {
    throw {
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch categories",
      status: error?.response?.status || 500,
    };
  }
};
