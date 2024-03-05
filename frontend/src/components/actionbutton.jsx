export const ActionButton = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="my-1 w-full rounded-md bg-black py-2 text-center text-white transition-all hover:bg-gray-700"
    >
      {text}
    </button>
  );
};
