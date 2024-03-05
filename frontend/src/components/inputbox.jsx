export const InputBox = ({ label, placeholder, value, setValue }) => {
  return (
    <div className="flex w-full flex-col items-start justify-center">
      <h3 className="my-1 text-xs font-semibold">{label}</h3>
      <input
        value={value}
        placeholder={placeholder ? placeholder : null}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        name={label}
        className="mb-2 w-full rounded-md border px-2 py-2 text-sm text-gray-500 outline-none"
      />
    </div>
  );
};
