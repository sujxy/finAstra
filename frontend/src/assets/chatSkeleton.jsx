export const ChatSkeleton = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} role="status" className="w-full animate-pulse">
          <div className="h-6 bg-gray-100 rounded-md dark:bg-gray-300 w-full mb-2"></div>
          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </>
  );
};
