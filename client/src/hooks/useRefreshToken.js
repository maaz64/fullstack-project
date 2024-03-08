import useAuth from "./useAuth";
import axiosInstance from '../axios/axios';

function useRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const res = await axiosInstance.post("/refresh-token");
    console.log("accessToken", res.data.data.accessToken);
    console.log("refreshToken", res.data.data.refreshToken);
    setAuth((prev) => {
      return { ...prev, accessToken: res.data.data.accessToken };
    });

    return res.data.data.accessToken;
  };

  return refresh;
}

export default useRefreshToken;
