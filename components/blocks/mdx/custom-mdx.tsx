import { MDXBlockquote } from "@/components/blocks/mdx/mdx-blockquote";
import { MDXCode, MDXCodeProps } from "@/components/blocks/mdx/mdx-code";
import {
  MDXHeading,
  MDXHeadingProps,
} from "@/components/blocks/mdx/mdx-heading";
import { MDXImage } from "@/components/blocks/mdx/mdx-image";
import { MDXLink } from "@/components/blocks/mdx/mdx-link";
import {
  MDXTaskList,
  MDXTaskListItem,
  MDXCheckbox,
  MDXTaskListProps,
  MDXTaskListItemProps,
} from "@/components/blocks/mdx/mdx-task-list";
import React from "react";

import "@/styles/md-styles.css";

import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

import { Mermaid } from "@/components/blocks/mdx/mdx-mermaid";
import { cn } from "@/lib/utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  MDXTable,
  MDXTableHead,
  MDXTableCell,
} from "@/components/blocks/mdx/mdx-table";

interface CustomMDXProps {
  source: string;
  className?: string;
}

/* eslint-disable */
// Patch: Ensure block code only
const CodeWrapper = (props: MDXCodeProps) => {
  const isInline = !props.className;
  if (props.className?.includes("language-mermaid")) {
    return <Mermaid>{props.children}</Mermaid>;
  }
  if (isInline) {
    return (
      <code className="px-1 py-0.5 bg-accent text-xs rounded border border-border">
        {props.children}
      </code>
    );
  }
  // console.log("CodeWrapper rendered with props:", props);
  // Extract language from className, e.g., "language-js"
  const match = props.className?.match(/language-(\w+)/);
  const language = match ? match[1] : undefined;
  return <MDXCode {...props} language={language} />;
};

// Custom list component to handle task lists
const ListWrapper = (props: MDXTaskListProps) => {
  const { children, className } = props;

  // Check if this is a task list (contains input checkboxes)
  // tslint:disable-next-line:no-any
  const isTaskList = React.Children.toArray(children).some(
    // eslint-disable-next-line:no-any
    (child: any) =>
      child?.props?.children &&
      Array.isArray(child.props.children) &&
      // tslint:disable-next-line:no-any
      child.props.children.some(
        // tslint:disable-next-line:no-any
        (grandChild: any) =>
          grandChild?.type === "input" &&
          grandChild?.props?.type === "checkbox",
      ),
  );

  if (isTaskList) {
    return <MDXTaskList className={cn(className)}>{children}</MDXTaskList>;
  }

  return (
    <ul className={cn(`list-disc ml-6 space-y-1`, className)}>{children}</ul>
  );
};

// Custom list item component to handle task list items
const ListItemWrapper = (props: MDXTaskListItemProps) => {
  const { children } = props;

  // Check if this list item contains a checkbox
  const hasCheckbox =
    Array.isArray(children) &&
    children.some(
      // tslint:disable-next-line:no-any
      (child: any) =>
        child?.type === "input" && child?.props?.type === "checkbox",
    );

  if (hasCheckbox) {
    // Extract checkbox and remaining content
    const checkbox = children.find(
      // tslint:disable-next-line:no-any
      (child: any) =>
        child?.type === "input" && child?.props?.type === "checkbox",
    );
    const content = children.filter(
      // tslint:disable-next-line:no-any
      (child: any) =>
        !(child?.type === "input" && child?.props?.type === "checkbox"),
    );

    return (
      <MDXTaskListItem>
        <MDXCheckbox checked={checkbox?.props?.checked || false} />
        <span
          className={
            checkbox?.props?.checked ? "line-through text-muted-foreground" : ""
          }
        >
          {content}
        </span>
      </MDXTaskListItem>
    );
  }

  return <li>{children}</li>;
};
/* eslint-enable */

const components = {
  img: MDXImage,
  a: MDXLink,
  code: CodeWrapper,
  mermaid: Mermaid,
  blockquote: MDXBlockquote,
  ul: ListWrapper,
  li: ListItemWrapper,
  table: MDXTable,
  thead: MDXTableHead,
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <MDXTableCell tag="th" {...props} />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <MDXTableCell tag="td" {...props} />
  ),
  h1: (props: Omit<MDXHeadingProps, "level">) => (
    <MDXHeading level={1} {...props} />
  ),
  h2: (props: Omit<MDXHeadingProps, "level">) => (
    <MDXHeading level={2} {...props} />
  ),
  h3: (props: Omit<MDXHeadingProps, "level">) => (
    <MDXHeading level={3} {...props} />
  ),
  h4: (props: Omit<MDXHeadingProps, "level">) => (
    <MDXHeading level={4} {...props} />
  ),
  h5: (props: Omit<MDXHeadingProps, "level">) => (
    <MDXHeading level={5} {...props} />
  ),
  h6: (props: Omit<MDXHeadingProps, "level">) => (
    <MDXHeading level={6} {...props} />
  ),
};

export function CustomMDX({ source, className }: CustomMDXProps) {
  return (
    <div className={cn("markdown-body", className)} suppressHydrationWarning>
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeHighlight],
          },
        }}
        components={components}
      />
    </div>
  );
}
