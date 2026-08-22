import React from "react";
import { mokpClass } from "@/utils";

interface TypeUiHeadingProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  tag: string;
  children: React.ReactNode;
}

export default function MokpUiHeading({
  title,
  description,
  tag: TagComponent = "h1",
  children,
  ...props
}: TypeUiHeadingProps) {
  return (
    <header className="mokp-heading" {...props}>
      {title ? (
        <div className="mokp-heading-content">
          <TagComponent className="mokp-heading-content-title">{title}</TagComponent>
        </div>
      ) : null}
      {children}
    </header>
  );
}
