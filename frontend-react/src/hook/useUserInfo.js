import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUserInfo = () => {
  const [axiosSecure] = useAxiosSecure();

  const { data: userInfo = [], isLoading: loading } = useQuery({
    queryKey: ["userInfo"],
    // enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/users/user-details`);
      const data = res.data;
      if (data.success) {
        return data.data;
      }
    },
  });

  return [userInfo, loading];
};

export default useUserInfo;
