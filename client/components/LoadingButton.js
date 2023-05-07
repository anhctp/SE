import React from "react";
import { twMerge } from "tailwind-merge";
import Spinner from "./Spinner";

export const LoadingButton = ({
  textColor = "text-white",
  btnColor = "bg-[#FFB200]",
  children,
  loading = false,
}) => {
  return (
    <button
      type="submit"
      className={twMerge(
        `w-full py-3 font-semibold rounded-lg outline-none border-none flex justify-center `,
        `${btnColor} ${loading && "bg-[#ccc]"}`
      )}
    >
      {loading ? (
        <div className="flex items-center gap-3">
          <Spinner />
          <span className="text-slate-500 inline-block">Loading...</span>
        </div>
      ) : (
        <span className={`${textColor}`}>{children}</span>
      )}
    </button>
  );
};
