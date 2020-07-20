import * as React from "react";

import { useRouter } from "next/router";

import { InferGetServerSidePropsType } from "next";
import { getItemPrice } from "nexus/item";

import { GoldAmount } from "~/components";

export default ({
  itemPrice,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(itemPrice);

  const dataIdx = itemPrice.data.length - 1;

  return (
    <div>
      <h2>{itemPrice.name}</h2>
      {itemPrice.data.length ? (
        <>
          <dl>
            <dt>Price</dt>
            <dd>
              <GoldAmount amount={itemPrice.data[dataIdx].marketValue} />
            </dd>
            <dt>Quantity</dt>
            <dd>{itemPrice.data[dataIdx].quantity}</dd>
            <dt>Min Buyout</dt>
            <dd>
              <GoldAmount amount={itemPrice.data[dataIdx].minBuyout} />
            </dd>
          </dl>
          <p>Last scanned: {itemPrice.data[dataIdx].scannedAt}</p>
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  const itemPrice = await getItemPrice({
    server: "yojamba-alliance",
    itemId: query.id,
  });

  // console.log(itemPrice);

  return {
    props: {
      itemPrice: itemPrice,
    },
  };
};
