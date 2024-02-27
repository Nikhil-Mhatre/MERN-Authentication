import { useQuery } from "@tanstack/react-query";
import { fetchData } from "./api";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import useBoundStore from "./store/useStore";

const App = () => {
  const navigate = useNavigate();
  const addUser = useBoundStore((state) => state.addUser);
  const removeUser = useBoundStore((state) => state.removeUser);

  const { data, isLoading, error } = useQuery({
    queryKey: ["fetch"],
    queryFn: () => fetchData(),
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (data) {
    addUser({ ...data });
  }

  const logoutHandler = () => {
    if (data) {
      localStorage.clear();
      removeUser();
      return navigate(0);
    }
    navigate("/auth");
  };

  return (
    <div className="h-screen bg-slate-400 flex flex-col justify-start items-center">
      <Navbar
        onClick={logoutHandler}
        buttonText={!data ? "Login" : "Log Out"}
      />
      <h1 className="text-2xl mt-24">
        {(isLoading && "Loading...") ||
          (error && "Please Sign IN") ||
          (data && `Welcome ${data.username}`)}
      </h1>
    </div>
  );
};

export default App;
