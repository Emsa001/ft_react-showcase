import React from "react";
import { ToastContainer, toast } from "react-toastify";

export function ReactToasts() {
const notify = () => toast("Wow so easy!");

    return (
      <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer aria-label="test" />
      </div>
    );
  }