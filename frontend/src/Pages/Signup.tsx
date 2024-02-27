import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signup } from "../api";
import { useEffect, useState } from "react";
import useBoundStore from "../store/useStore";

interface SubmitHandler {
  (event: React.FormEvent<HTMLFormElement>): void;
}

interface errType {
  response: {
    data: {
      message: string;
    };
  };
}

function Signup() {
  const navigate = useNavigate();
  const sessionExists = useBoundStore((state) => state.email);
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    if (sessionExists) return navigate("/");
  }, []);

  useEffect(() => {
    if (errMessage !== "") {
      const counter = setTimeout(() => {
        setErrMessage("");
      }, 5000);

      return () => {
        clearTimeout(counter);
      };
    }
  }, [errMessage]);

  const { mutateAsync: mutateForm } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      localStorage.setItem("profile", JSON.stringify(data.token));
      navigate("/auth/signin");
    },
    onError: (err: errType) => {
      setErrMessage(err?.response?.data?.message);
    },
  });

  const submitHandler: SubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    mutateForm(data);
  };

  return (
    <div className="h-screen flex justify-center items-start py-24">
      <form
        onSubmit={submitHandler}
        className="flex flex-col justify-center items-center gap-4 rounded-lg border-2 py-4 px-6"
      >
        <span>{errMessage}</span>
        <input
          className="border-2 outline-none py-2 px-4"
          type="username"
          name="username"
          id="username"
          placeholder="Username ...."
        />
        <input
          className="border-2 outline-none py-2 px-4"
          type="email"
          name="email"
          id="email"
          placeholder="Email ...."
        />
        <input
          className="border-2 outline-none py-2 px-4"
          type="password"
          name="password"
          id="password"
          placeholder="Password ...."
        />
        <button className="border-2 outline-none py-2 px-4 hover:bg-green-200 rounded-lg">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
