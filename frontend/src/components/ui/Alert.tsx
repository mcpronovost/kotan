import React from "react";
import { IconAlertCircle, IconAlertTriangle, IconAlertHexagon, IconInfoCircle, IconBolt } from "@tabler/icons-react";
import { mokpClass } from "@/utils";

interface TypeUiAlertProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  message?: string;
  variant: "default" | "success" | "error" | "info" | "warning" | "express";
  ghost: boolean;
  showIcon: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export default function MokpAlert({
  title,
  message,
  variant = "default",
  ghost = false,
  showIcon = true,
  icon,
  children,
  ...props
}: TypeUiAlertProps) {
  return (
    <div className={mokpClass("mokp-alert", `mokp-variant-${variant}`, ghost && "mokp-ghost")} {...props}>
      {showIcon && (
        <div className="mokp-alert-icon">
          {icon ? (
            icon
          ) : variant === "success" ? (
            <IconAlertCircle size={22} />
          ) : variant === "error" ? (
            <IconAlertTriangle size={22} />
          ) : variant === "info" ? (
            <IconInfoCircle size={22} />
          ) : variant === "warning" ? (
            <IconAlertHexagon size={22} />
          ) : variant === "express" ? (
            <IconBolt size={22} />
          ) : (
            <IconAlertCircle size={22} />
          )}
        </div>
      )}
      {(title || message || children) && (
        <div className="mokp-alert-content">
          {title && <div className="mokp-alert-title">{title}</div>}
          {message && <div className="mokp-alert-message">{message}</div>}
          {children}
        </div>
      )}
    </div>
  );
}
