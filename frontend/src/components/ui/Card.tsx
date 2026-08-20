import React from "react";

interface TypeUiCardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export default function MokpCard({ children, ...props }: TypeUiCardProps) {
  return (
    <div className="mokp-card" {...props}>{children}</div>
  );
}
