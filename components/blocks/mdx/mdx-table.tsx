"use client";

import { cn } from "@/lib/utils";

// Custom MDX table components styled like shadcn/ui table
const MDXTable = (props: React.TableHTMLAttributes<HTMLTableElement>) => (
  <div className="w-full overflow-x-auto">
    <table {...props} />
  </div>
);

const MDXTableHead = (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className="[&_tr]:border-b [&_tr]:bg-muted/50">{props.children}</thead>
);

type MDXTableCellProps = React.TdHTMLAttributes<HTMLTableCellElement> &
  React.ThHTMLAttributes<HTMLTableCellElement> & { tag?: "td" | "th" };
const MDXTableCell = ({ tag = "td", ...props }: MDXTableCellProps) => {
  const Tag = tag;
  const className =
    Tag === "th"
      ? "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
      : "p-4 align-middle [&:has([role=checkbox])]:pr-0";
  return (
    <Tag
      className={cn(className + (props.className ? ` ${props.className}` : ""))}
    >
      {props.children}
    </Tag>
  );
};

export { MDXTable, MDXTableHead, MDXTableCell };
