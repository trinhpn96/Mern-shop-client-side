import React from "react";
import { ErrorIcon } from "./icons";

const FormRowError = ({ error }) => {
  if (!error) return null;
  return (
    <>
      {error && (
        <div className="text-sm text-red-500 mt-2">
          <div className="flex items-center gap-2 ">
            <ErrorIcon className="icon icon-sm" />
            {error?.message}
          </div>
        </div>
      )}
    </>
  );
};

export default FormRowError;
