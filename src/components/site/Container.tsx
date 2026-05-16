import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[86rem] px-6 lg:px-10 2xl:px-14 ${className}`}>
      {children}
    </div>
  );
}
