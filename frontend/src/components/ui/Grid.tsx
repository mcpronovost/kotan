import React from "react";
import { mokpClass } from "@/utils";

interface TypeUiGridProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  full?: boolean;
  className?: string;
}

interface TypeUiGridRowProps extends React.HTMLAttributes<HTMLElement> {
  wrap?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface TypeUiGridColProps extends React.HTMLAttributes<HTMLElement> {
  col?: string;
  xl?: string;
  lg?: string;
  md?: string;
  sm?: string;
  order?: number;
  orderMd?: number;
  orderSm?: number;
  grow?: boolean;
  children: React.ReactNode;
  className?: string;
}

function MokpGrid({ full = false, children, className, ...props }: TypeUiGridProps) {
  return (
    <section className={`mokp-grid ${full ? "mokp-grid-full" : ""} ${className ? className : ""}`} {...props}>
      {children}
    </section>
  );
}

function MokpGridRow({ wrap, children, className, ...props }: TypeUiGridRowProps) {
  return (
    <div className={`mokp-grid-row ${wrap ? "mokp-grid-row-wrap" : ""} ${className ? className : ""}`} {...props}>
      {children}
    </div>
  );
}

function MokpGridCol({
  col = "100",
  xl = col,
  lg = xl,
  md = lg,
  sm = "100",
  order = 0,
  orderMd = 0,
  orderSm = 0,
  grow = true,
  nop = false,
  children,
  className,
  ...props
}: TypeUiGridColProps) {
  return (
    <div
      className={mokpClass(
        "mokp-grid-col",
        `mokp-col-${col} mokp-col-xl-${xl} mokp-col-lg-${lg} mokp-col-md-${md} mokp-col-sm-${sm}`,
        `mokp-order-${order} mokp-order-md-${orderMd} mokp-order-sm-${orderSm}`,
        grow && "mokp-grow",
        nop && "mokp-nop",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

namespace MokpGrid {
  export const Row = MokpGridRow;
  export const Col = MokpGridCol;
}

export default MokpGrid;
