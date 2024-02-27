import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { signin, signup } from "../api";
import { useNavigate } from "react-router-dom";

interface FormSubmitHandlerType {
  (event: React.FormEvent<HTMLFormElement>): void;
}

interface errType {
  response: {
    data: {
      message: string;
    };
  };
}

const Auth = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState("login");
  const [errMessage, setErrMessage] = useState("");

  const { mutateAsync: mutateForm } = useMutation({
    mutationFn: formState === "login" ? signin : signup,
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem("profile", JSON.stringify(data.token));
      navigate("/");
    },
    onError: (err: errType) => {
      setErrMessage(err?.response?.data?.message);
    },
  });

  const FormStateHandler = () => {
    setFormState((prev) => (prev === "login" ? "signup" : "login"));
  };
  const formChangeHandler = () => {
    setErrMessage("");
  };

  const formSubmitHandler: FormSubmitHandlerType = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    mutateForm(data);
  };

  return (
    // background
    <div className="flex h-screen items-start justify-center py-24">
      {/* Container */}
      <div
        className="flex flex-col items-center justify-center gap-4 rounded-lg 
                    border-2 px-6 py-4"
      >
        <p>Welcome Please {formState === "login" ? "Login" : "Sign Up"}</p>
        {errMessage !== "" && <p className="text-red-600">{errMessage}</p>}
        <form
          onChange={formChangeHandler}
          onSubmit={formSubmitHandler}
          className="flex flex-col gap-4 "
        >
          {formState === "signup" && (
            <input
              className="border-2 px-4 py-2 outline-none"
              type="username"
              name="username"
              id="username"
              placeholder="Username ...."
            />
          )}
          <input
            className="border-2 px-4 py-2 outline-none"
            type="email"
            name="email"
            id="email"
            placeholder="Email ...."
          />
          <input
            className="border-2 px-4 py-2 outline-none"
            type="password"
            name="password"
            id="password"
            placeholder="Password ...."
          />
          <button className="rounded-lg border-2 px-4 py-2 outline-none hover:bg-green-200">
            {formState === "login" ? "Login" : "Sign Up"}
          </button>
        </form>
        {formState === "login" ? (
          <p onClick={FormStateHandler}>
            Don't Have Account{" "}
            <span className="cursor-pointer underline underline-offset-2 hover:text-blue-600">
              Sign up
            </span>
          </p>
        ) : (
          <p onClick={FormStateHandler}>
            Alread Have Account{" "}
            <span className="cursor-pointer underline underline-offset-2 hover:text-blue-600">
              Sign in
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;
