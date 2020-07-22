import React from "react";
import * as localforage from "localforage";
import { searchDb, getItemPrice, ItemPrice } from "~/nexus";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Link from "next/link";
import { GoldAmount } from "./GoldAmount";
import { HeartRegular, HeartSolid } from "./icons/Heart";

dayjs.extend(relativeTime);

const favouriteStore = localforage.createInstance({
  name: "favourites",
});

const itemPriceStore = localforage.createInstance({
  name: "itemPrice",
});

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
  const [isFavourite, setFavourite] = React.useState(false);

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
        itemPriceStore.setItem(`${itemId}`, data);
      });
    };
  }, [setItemData]);

  const handleFavourite = React.useMemo(() => {
    return async (e) => {
      e.preventDefault();

      if (isFavourite) {
        favouriteStore.setItem(`${itemId}`, false);
        setFavourite(false);
      } else {
        favouriteStore.setItem(`${itemId}`, true);
        setFavourite(true);
      }
    };
  }, [isFavourite]);

  React.useEffect(() => {
    (async () => {
      const [itemData, isFavourite] = await Promise.all([
        itemPriceStore.getItem<ItemPrice>(`${itemId}`),
        favouriteStore.getItem<boolean>(`${itemId}`),
      ]);

      if (itemData) {
        setItemData(itemData);
      }

      if (isFavourite) {
        setFavourite(isFavourite);
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
        <button className="btn text-danger" onClick={handleFavourite}>
          {isFavourite ? (
            <HeartSolid width="24" height="24" />
          ) : (
            <HeartRegular width="24" height="24" />
          )}{" "}
          <span className="sr-only">Favourite</span>
        </button>{" "}
        <button className="btn btn-outline-success" onClick={getPrice}>
          Refresh
        </button>
      </div>
    </article>
  );
};

export const SearchResults: React.FC<SearchResultsProps> = ({ items }) => {
  const [favourites, setFavourites] = React.useState({});
  React.useEffect(() => {
    (async () => {
      const favourites = (await favouriteStore.keys()).reduce((acc, n) => {
        acc[n] = true;
        return acc;
      }, {});
      setFavourites(favourites);
    })();
  }, []);
  return (
    <ul className="list-unstyled py-3 border rounded row">
      {items
        .sort((a, b) => {
          // if (favourites[a.itemId] && favourites[b.itemId]) {
          //   return 0;
          // }

          if (favourites[a.itemId]) {
            return -1;
          }

          if (favourites[b.itemId]) {
            return 1;
          }

          return 0
        })
        .map((item) => (
          <li className="col-6 col-md-12" key={item.itemId}>
            <ItemSearchResult {...item} />
          </li>
        ))}
    </ul>
  );
};
