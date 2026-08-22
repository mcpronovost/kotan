import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";
import type { Icon, IconProps } from "@tabler/icons-react";
import type { TypeRouteParams } from "@/services/router/types";
import { memo, useCallback, useMemo } from "react";
import { IconAtom2 } from "@tabler/icons-react";
import { useRouter } from "@/services/router";
import { buildRoutePath } from "@/services/router/utils";
import { mokpClass } from "@/utils";

interface MokpUiButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  label?: string;
  route?: string;
  params?: TypeRouteParams;
  type: "button" | "submit" | "reset";
  variant: "default" | "card" | "success" | "danger" | "info" | "warning" | "express";
  prependIcon?: Icon;
  appendIcon?: Icon;
  disabled?: boolean;
  clickable?: boolean;
  loading: boolean;
  onClick?: () => void;
  block: boolean;
  className?: string;
}

function MokpUiButton({
  children,
  label,
  route,
  params = {},
  type = "button",
  variant = "default",
  prependIcon: IconPrependComponent,
  appendIcon: IconAppendComponent,
  disabled = false,
  clickable = true,
  loading = false,
  onClick,
  block = false,
  className = "",
  ...props
}: MokpUiButtonProps) {
  const { n, lang } = useRouter();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (type !== "submit") {
        e.preventDefault();
      }
      if (!disabled && route) {
        n(route, params, lang);
      } else if (!disabled && onClick) {
        onClick();
      }
    },
    [disabled, n, route, params, lang],
  );

  const classes = useMemo(
    () =>
      mokpClass(
        "mokp-button",
        `mokp-variant-${variant}`,
        block && "mokp-block",
        disabled && "mokp-disabled",
        className,
      ),
    [disabled, className],
  );

  return (
    <button type={type} onClick={handleClick} className={classes} {...props}>
      <div className="mokp-button-content">
        {IconPrependComponent && (
          <div className="mokp-button-content-icon">
            <IconPrependComponent size={19} />
          </div>
        )}
        {label ? <span className="mokp-button-content-label">{label}</span> : null}
        {children}
        {IconAppendComponent && (
          <div className="mokp-button-content-icon">
            <IconAppendComponent size={19} />
          </div>
        )}
      </div>
      {loading ? (
        <span className="mokp-button-loading">
          <span className="mokp-button-loading-icon">
            <IconAtom2 size={24} />
          </span>
        </span>
      ) : null}
    </button>
  );
}

export default memo(MokpUiButton);
