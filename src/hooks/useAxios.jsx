import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://api.winaclaim.com/api/`,
});
const useAxios = () => {
  return axiosInstance;
};

export default useAxios;