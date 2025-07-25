"use client";

import { SearchDialog } from "@/components/features/search-dialog";
import { useSearch } from "@/components/providers/search-provider";

export function Search() {
  const { isSearchOpen, closeSearch } = useSearch();

  return <SearchDialog isOpen={isSearchOpen} onOpenChange={closeSearch} />;
}
