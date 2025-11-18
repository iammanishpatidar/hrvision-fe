import React from 'react';

interface LoaderProps {
  containerStyle?: string;
}

const Loader: React.FC<LoaderProps> = ({ containerStyle }) => {
  return (
    <div className={`flex items-center justify-center w-full ${containerStyle}`}>
      <span className="relative flex size-12">
        <span className="animate-spin absolute inline-flex h-full w-full rounded-full border-4 border-solid border-[#444291] border-t-transparent" />
        <span className="sr-only">Loading...</span>
      </span>
    </div>
  );
};

export default Loader;
