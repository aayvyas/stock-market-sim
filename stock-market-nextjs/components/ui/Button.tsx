import clsx from "clsx";
import { MouseEventHandler } from "react";

type variant = "Success" | "Danger" | "Neutral";

const Button = ({
  onClick,
  className,
  variant = "Neutral",
  children = "",
}: {
  onClick?: MouseEventHandler;
  variant?: variant;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={clsx("px-5 py-2 rounded-xl shadow-2xl border " + className, {
        " border-zinc-200 hover:bg-zinc-100 dark:bg-black dark:border-zinc-800 dark:hover:bg-zinc-900":
          variant === "Neutral",
        "bg-red-300 border-red-500 dark:bg-red-900 dark:border-red-600 dark:hover:bg-red-800 hover:bg-red-400 hover:border-red-400":
          variant === "Danger",
        "bg-green-300 border-green-500 hover:bg-green-400 hover:border-green-400 dark:bg-green-900 dark:border-green-600 dark:hover:bg-green-800":
          variant === "Success",
      })}
    >
      {children}
    </button>
  );
};

export default Button;
