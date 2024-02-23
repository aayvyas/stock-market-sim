import React from "react";

const Card = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={"bg-zinc-950  rounded-3xl border border-zinc-900 " + className}
    >
      {children}
    </div>
  );
};

export default Card;
