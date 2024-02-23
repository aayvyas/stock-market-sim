const TextInput = ({
  id,
  className,
  placeholder,
  onChange,
  name,
}: {
  id?: string;
  className?: string;
  placeholder?: string;
  onChange: Function;
  name?: string;
}) => {
  return (
    <>
      <input
        id={id}
        defaultValue=""
        name={name}
        onChange={(e) => onChange(e.currentTarget.value)}
        className={
          "dark:bg-black rounded-xl border border-zinc-700 p-2 shadow-xl " +
          className
        }
        placeholder={placeholder}
      ></input>
    </>
  );
};

export default TextInput;
