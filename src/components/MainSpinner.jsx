import React from "react";
import { PacmanLoader } from "react-spinners";

function MainSpinner() {
  return (
    <div className="z-50 fixed inset-0 w-screen h-screen flex justify-center items-center bg-white">
      <PacmanLoader color="#240A34" size={25} />
    </div>
  );
}

export default MainSpinner; 
