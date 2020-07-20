import React from "react";
import { searchDb } from "~/nexus";

import Link from "next/link";

interface Item {
  itemId: number;
  name: string;
  uniqueName: string;
  imgUrl: string;
}

interface SearchResultsProps {
  items: Item[];
}

export const SearchResults: React.FC<SearchResultsProps> = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.itemId}>
          <img src={item.imgUrl} />
          <Link href={`/item/${item.itemId}`}>
            <a>{item.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
