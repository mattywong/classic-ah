import React from "react";
import * as localforage from "localforage";
import { searchDb, getItemPrice, ItemPrice } from "~/nexus";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Link from "next/link";
import { GoldAmount } from "./GoldAmount";

dayjs.extend(relativeTime);

interface Item {
  itemId: number;
  name: string;
  uniqueName: string;
  imgUrl: string;
}

interface SearchResultsProps {
  items: Item[];
}

export const ItemSearchResult: React.FC<Item> = ({
  imgUrl,
  itemId,
  name,
  uniqueName,
}) => {
  const [itemData, setItemData] = React.useState<ItemPrice | undefined>(
    undefined
  );

  const lastScanned = React.useMemo(() => {
    if (itemData === undefined) {
      return "n/a";
    }
    return dayjs(
      itemData?.data[itemData?.data.length - 1]?.scannedAt
    ).fromNow();
  }, [itemData]);

  const getPrice = React.useMemo(() => {
    return (e) => {
      e.preventDefault();
      getItemPrice({
        server: "yojamba-alliance",
        itemId,
      }).then((data) => {
        console.log(data);
        setItemData(data);
        localforage.setItem(`${itemId}`, data);
      });
    };
  }, [setItemData]);

  React.useEffect(() => {
    (async () => {
      const itemData = await localforage.getItem<ItemPrice>(`${itemId}`);
      if (itemData) {
        setItemData(itemData);
      }
    })();
  }, []);

  return (
    <article className="d-flex flex-column flex-md-row mb-3 border rounded align-items-center">
      <div className="">
        <a href="#" data-wowhead={`item=${itemId}`}>
          <img src={imgUrl} />
        </a>
      </div>
      <div className="col d-flex flex-column">
        <Link href={`/item/${itemId}`}>
          <a>{name}</a>
        </Link>

        {lastScanned}
      </div>
      <div className="col">
        <strong className="d-block">Market Value</strong>
        <GoldAmount
          amount={
            itemData?.data[itemData?.data.length - 1]?.marketValue || null
          }
        />
      </div>
      <div className="col">
        <strong className="d-block">Quantity</strong>
        <span>{itemData?.data[itemData?.data.length - 1]?.quantity}</span>
      </div>
      <div className="col">
        <strong className="d-block">Min Buyout</strong>
        <GoldAmount
          amount={itemData?.data[itemData?.data.length - 1]?.minBuyout || null}
        />
      </div>
      <div className="ml-auto col col-auto">
        <button className="btn btn-outline-success" onClick={getPrice}>
          Refresh
        </button>
      </div>
    </article>
  );
};

export const SearchResults: React.FC<SearchResultsProps> = ({ items }) => {
  return (
    <ul className="list-unstyled py-3 border rounded row">
      {items.map((item) => (
        <li className="col-6 col-md-12" key={item.itemId}>
          <ItemSearchResult {...item} />
        </li>
      ))}
    </ul>
  );
};
