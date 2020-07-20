interface SearchDbOptions {
  query: string;
}

interface Item {
  itemId: number;
  name: string;
  uniqueName: string;
  imgUrl: string;
}

export const searchDb = async ({ query }: SearchDbOptions) => {
  return fetch(
    `https://api.nexushub.co/wow-classic/v1/search?query=${query}`
  ).then<Item[]>((res) => {
    if (res.ok) {
      return res.json();
    }
  });
};
