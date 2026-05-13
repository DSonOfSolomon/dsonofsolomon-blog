type LoadingStateProps = {
    message?: string;
  };
  
  export default function LoadingState({
    message = "Loading...",
  }: LoadingStateProps) {
    return (
      <div className="rounded-2xl border border-gray-200 px-6 py-10 text-center">
        <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-[#0a192f]" />
  
        <p className="mt-4 text-sm text-gray-600">
          {message}
        </p>
      </div>
    );
  }