import React from "react";
import { searchDb } from "~/nexus";
interface Item {
  itemId: number;
  name: string;
  uniqueName: string;
  imgUrl: string;
}

interface SearchResultsProps {
  items: Item[];
}

const Item = ({}) => {
  return <div></div>;
};

export const SearchResults: React.FC<SearchResultsProps> = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.itemId}>
          <img src={item.imgUrl} />
          {item.name}
        </li>
      ))}
    </ul>
  );
};
