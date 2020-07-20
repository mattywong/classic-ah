import * as React from "react";

interface GoldAmountProps {
  amount: number;
}

export const GoldAmount: React.FC<GoldAmountProps> = ({ amount }) => {
  const { g, s, c } = React.useMemo(() => {
    const g = Math.floor(amount / 10000);
    const s = Math.floor((amount % 10000) / 100);
    const c = amount % 100;
    return {
      g,
      s,
      c,
    };
  }, [amount]);

  console.log(amount);

  return (
    <span>
      {g} gold | {s} silver | {c} copper
    </span>
  );
};
