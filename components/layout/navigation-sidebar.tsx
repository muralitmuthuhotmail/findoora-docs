"use client";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

interface NavigationItem {
  title: string;
  url: string;
  items?: NavigationItem[] | null;
}

interface NavigationSidebarProps {
  navigationData: NavigationItem[];
  className?: string;
  onNavigate?: () => void;
}

interface NavigationMenuItemProps {
  item: NavigationItem;
  isSubItem?: boolean;
  value?: string;
  isSelected?: boolean;
  onNavigate?: () => void;
  selectedUrl?: string;
}

function NavigationMenuItem({
  item,
  isSubItem = false,
  value = "",
  isSelected = false,
  onNavigate,
  selectedUrl,
}: NavigationMenuItemProps) {
  if (isSubItem) {
    return (
      <SidebarMenuSubItem
        value={value}
        defaultValue={value}
        className="no-wrap whitespace-nowrap"
      >
        <SidebarMenuSubButton asChild>
          <Link
            href={item.url}
            className={cn(
              isSelected ? "bg-primary/10 text-primary font-bold" : "",
            )}
            aria-current={isSelected ? "page" : undefined}
            onClick={onNavigate}
          >
            {item.title}
          </Link>
        </SidebarMenuSubButton>
        {item.items?.length ? (
          <SidebarMenuSub>
            {item.items.map((subItem) => {
              return (
                <NavigationMenuItem
                  key={subItem.title}
                  item={subItem}
                  isSubItem={true}
                  isSelected={selectedUrl === subItem.url}
                  onNavigate={onNavigate}
                />
              );
            })}
          </SidebarMenuSub>
        ) : null}
      </SidebarMenuSubItem>
    );
  }

  return (
    <SidebarMenuItem
      value={value}
      defaultValue={value}
      className="no-wrap whitespace-nowrap"
    >
      <SidebarMenuButton asChild>
        <Link
          href={item.url}
          className={cn(
            `font-medium`,
            isSelected && "bg-primary/10 text-primary",
          )}
          aria-current={isSelected ? "page" : undefined}
          onClick={onNavigate}
        >
          {item.title}
        </Link>
      </SidebarMenuButton>
      {item.items?.length ? (
        <SidebarMenuSub>
          {item.items.map((subItem) => {
            return (
              <NavigationMenuItem
                key={subItem.title}
                item={subItem}
                isSubItem={true}
                isSelected={selectedUrl === subItem.url}
                onNavigate={onNavigate}
              />
            );
          })}
        </SidebarMenuSub>
      ) : null}
    </SidebarMenuItem>
  );
}

export function NavigationSidebar({
  navigationData,
  className,
  onNavigate,
}: NavigationSidebarProps) {
  const params = useParams();
  const currentURL =
    params?.category && params?.slug
      ? `/${params.category}/${params.slug}`
      : `/${params?.category}`;
  return (
    <SidebarMenu
      className={cn(
        `overflow-y-auto max-h-[calc(70vh)] rounded-xl p-6 bg-card/70 scroll-smooth shadow-none`,
        className,
      )}
    >
      {navigationData.map((item) => {
        return (
          <NavigationMenuItem
            key={item.title}
            item={item}
            selectedUrl={currentURL}
            isSelected={currentURL === item.url}
            onNavigate={onNavigate}
          />
        );
      })}
    </SidebarMenu>
  );
}
