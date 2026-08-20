import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { memo, useCallback, useMemo } from "react";
import type { TypeRouteParams } from "@/services/router/types";
import { useRouter } from "@/services/router";
import { buildRoutePath } from "@/services/router/utils";
import { mokpClass } from "@/utils";

interface MokpLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  route: string;
  params?: TypeRouteParams;
  disabled?: boolean;
  colorHover?: string;
  className?: string;
}

function MokpLink({
  children,
  route = "home",
  params = {},
  disabled = false,
  block = false,
  colorHover,
  className = "",
  ...props
}: MokpLinkProps) {
  const { n, lang } = useRouter();

  const href = useMemo(() => {
    if (disabled) return "/";
    return `/${buildRoutePath(route, params, lang) || (route !== "home" ? route : "")}`;
  }, [disabled, route, params, lang]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (!disabled) {
        n(route, params, lang);
      }
    },
    [disabled, n, route, params, lang],
  );

  const classes = useMemo(
    () => mokpClass("mokp-link", disabled && "mokp-disabled", colorHover && `mokp-link-hover-${colorHover}`, className),
    [disabled, colorHover, className],
  );

  return (
    <a href={href} onClick={handleClick} className={classes} {...props}>
      {children}
    </a>
  );
}

export default memo(MokpLink);
