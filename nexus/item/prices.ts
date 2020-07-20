interface ItemPrice {
  slug: string;
  itemId: number;
  name: string;
  uniqueName: string;
  timerange: number;
  data: Datum[];
}

interface Datum {
  marketValue: number;
  minBuyout: number;
  quantity: number;
  scannedAt: string;
}

export const getItemPrice = ({ server, itemId }) => {
  return fetch(
    `https://api.nexushub.co/wow-classic/v1/items/${server}/${itemId}/prices`
  ).then<ItemPrice>((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};
