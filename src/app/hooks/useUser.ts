import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const useUser = () => {
  return useSelector((state: RootState) => state.app.user);
};

export default useUser;
