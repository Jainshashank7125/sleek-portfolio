import React from 'react';

export default function Container({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12 ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
}
