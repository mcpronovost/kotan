import React from "react";

interface TypeUiDividerProps extends React.HTMLAttributes<HTMLElement> {
  label?: string;
  children: React.ReactNode;
}

export default function MokpUiDivider({ label, children, ...props }: TypeUiDividerProps) {
  return (
    <div className="mokp-divider" role="separator" {...props}>
      {label ? <span className="mokp-divider-label">{label}</span> : null}
      {children}
    </div>
  );
}
