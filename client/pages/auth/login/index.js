import React, { useState } from "react";
import AuthService from "../../../services/auth.service";
import { token } from "../../../utils/token";
import { useRouter } from "next/router";
import { notification } from "antd";
import { object, string, TypeOf } from "zod";
import { useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../../components/FormInput";
import { LoadingButton } from "../../../components/LoadingButton";
import Link from "next/link";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const loginSchema = object({
    email: string()
      .min(1, "Email address is required")
      .email("Email Address is invalid"),
    password: string()
      .min(1, "Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
  });

  const handleLogin = async (values) => {
    try {
      const res = await AuthService.login(values);
      if (res.status != 200) {
        notification.error({ message: res.message });
        return;
      }
      token.set(res.token);
      router.back();
    } catch (error) {}
  };

  const methods = useForm({
    resolver: zodResolver(loginSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler = (values) => {
    console.log(values);
    handleLogin(values);
  };

  return (
    <section className="min-h-screen grid place-items-center">
      <div
        style={{
          position: "absolute",
          right: "2%",
          top: "4%",
          borderRadius: "50%",
          zIndex: -1,
        }}
      >
        <img
          src="/image/vitvang1.jpg"
        ></img>
      </div>
      <div
        style={{
          position: "absolute",
          left: "-2%",
          top: "25%",
          borderRadius: "50%",
          zIndex: -1,
        }}
      >
        <img
          src="/image/vitvang.jpg"
        ></img>
        
      </div>
      <div className="w-full z-10">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="max-w-md z-10 w-full mx-auto overflow-hidden shadow-lg bg-gray-100 rounded-2xl p-8 space-y-5"
          >
            <h1 className="text-4xl xl:text-6xl text-center font-[600] text-ct-yellow-600 mb-4">
              <Link href="/">JAPPER</Link>
            </h1>
            <h2 className="text-lg text-center mb-4 text-ct-blue-600">
              Login to have access
            </h2>
            <FormInput label="Email" name="email" type="email" />
            <FormInput label="Password" name="password" type="password" />

            <LoadingButton loading={loading} textColor="text-ct-blue-600">
              Login
            </LoadingButton>
            <span className="block">
              Need an account?{" "}
              <Link href="/auth/register" className="text-ct-blue-600">
                Sign Up Here
              </Link>
            </span>
          </form>
        </FormProvider>
        </div>
    </section>
  );
};

export default Login;