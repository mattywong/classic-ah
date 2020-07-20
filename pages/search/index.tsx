import * as React from "react";

import * as Yup from "yup";

import { searchDb } from "~/nexus";

import { SearchResults } from "~/components";
import { useRouter } from "next/router";

import { InferGetStaticPropsType } from "next";

export default ({
  items,
}: InferGetStaticPropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const { q } = router.query;
  return (
    <>
      <SearchResults items={items} />
    </>
  );
};

export const getServerSideProps = async ({ query }) => {
  let items = await searchDb({ query: query.q });

  // const test = new Map(items)

  let $items = items.reduce((acc, item) => {
    acc.set(item.itemId, item);
    return acc;
  }, new Map<number, typeof items[number]>());

  items = Array.from($items, ([k, v]) => {
    return v;
  });

  console.log(query.q);
  // console.log(items);

  return {
    props: { items: items },
  };
};
