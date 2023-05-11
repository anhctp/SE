import React, { useState } from "react";
import AuthService from "../../../services/auth.service";
import { token } from "../../../utils/token";
import { useRouter } from "next/router";
import { object, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import FormInput from "../../../components/FormInput";
import { LoadingButton } from "../../../components/LoadingButton";
import { notification } from "antd";
const registerSchema = object({
  name: string().min(1, "Full name is required").max(100),
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  passwordConfirm: string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

const Login = () => {
  const router = useRouter();
  const methods = useForm({
    resolver: zodResolver(registerSchema),
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    delete values.passwordConfirm;
    try {
      setLoading(true);
      const res = await AuthService.register(values);
      console.log(res);
      token.set(res.token);
      router.push("/");
      notification.success({ message: "Register successfully!" });
    } catch (error) {
      notification.error({ message: "Có lỗi xảy ra" });
    } finally {
      setLoading(false);
    }
  };
  const onSubmitHandler = (values) => {
    console.log("I was called");
    handleRegister(values);
  };

  return (
    <section className="py-8 min-h-screen grid place-items-center">
      <div
        style={{
          position: "absolute",
          right: "10%",
          top: "10%",
          borderRadius: "50%",
          width: "300px",
          zIndex: -1,
        }}
      >
        <img
          style={{ borderRadius: "50%" }}
          src="/image/345230497_556958093258722_2634146501096535841_n.jpg"
        ></img>
      </div>
      <div className="w-full">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-100 rounded-2xl p-8 space-y-5"
          >
            <h1 className="text-4xl xl:text-6xl text-center font-[600] text-ct-yellow-600 mb-4">
              <Link href="/">JAPPER</Link>
            </h1>
            <h2 className="text-lg text-center mb-4 text-ct-blue-600">
              Sign Up To Get Started!
            </h2>
            <FormInput label="Full Name" name="name" />
            
            <FormInput label="Email" name="email" type="email" />
            <FormInput label="Password" name="password" type="password" />
            <FormInput
              label="Confirm Password"
              name="passwordConfirm"
              type="password"
            />
            <span className="block">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-ct-blue-600">
                Login Here
              </Link>
            </span>
            <LoadingButton loading={loading} textColor="text-ct-blue-600">
              Sign Up
            </LoadingButton>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default Login;