import axios from "axios";
import InputField from "components/fields/InputField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { FcGoogle } from "react-icons/fc";
// import Checkbox from "components/checkbox";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [load, SetLoad] = useState(false);

  const fromsubmit = async () => {
    try {
      if (load) {
        return toast.warn("wait please");
      }
      SetLoad(true);
      if (!email && !Password) {
        SetLoad(false);
        return toast.warning("please fill the form");
      }

      const reslogin = await toast.promise(
        axios.post("/api/auth/login", {
          email,
          password: Password,
        }),
        {
          pending: "wait please",
          success: "Login successful",
          error: {
            render({ data }) {
              if (data.response?.status === 401) {
                return <p className="text-sm">{data.response?.data}</p>;
              }
              return <h1> Something is wrong!</h1>;
            },
          },
        },
        {
          position: "bottom-left",
        }
      );

      navigate("/admin/default");

      SetLoad(false);
    } catch (error) {
      SetLoad(false);
      console.log("🚀 ~ file: SignIn.jsx:16 ~ fromsubmit ~ error:", error);
    }
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">Sign In</h4>
        <p className="mb-9 ml-1 text-base text-gray-600">Enter your email and password to sign in!</p>
        {/* <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
          <div className="rounded-full text-xl">
            <FcGoogle />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            Sign In with Google
          </h5>
        </div>
        <div className="mb-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div> */}
        {/* Email */}

        <InputField
          variant="auth"
          extra="mb-3"
          label="Email*"
          placeholder="mail@simmmple.com"
          id="email"
          type="text"
          value={email}
          change={setEmail}
        />

        {/* Password */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Password*"
          placeholder="Min. 8 characters"
          id="password"
          type="password"
          value={Password}
          change={setPassword}
        />
        <button
          onClick={fromsubmit}
          className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
