type EmptyStateProps = {
    title: string;
    message: string;
  };
  
  export default function EmptyState({ title, message }: EmptyStateProps) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 px-6 py-10 text-center">
        <h2 className="text-lg font-semibold tracking-tight text-gray-950">
          {title}
        </h2>
  
        <p className="mt-3 text-sm leading-7 text-gray-600">
          {message}
        </p>
      </div>
    );
  }