import React from "react";

const Modal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="transition-all duration-1000 delay-1000 z-30 justify-center items-center flex -top-5 left-0 backdrop:bg-zinc-900  backdrop-blur-md fixed w-screen h-screen">
      {children}
    </div>
  );
};

export default Modal;
