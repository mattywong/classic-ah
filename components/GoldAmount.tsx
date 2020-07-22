import * as React from "react";
import styled from "styled-components";

export const Coin = styled.span`
  &:after {
    content: "";
    display: inline-block;
    height: 1em;
    width: 1em;
    background-color: red;
    border-radius: 50%;
    border: 1px solid black;
    vertical-align: middle;
  }
`;

export const GoldCoin = styled(Coin)`
  &:after {
    background-color: gold;
  }
`;

export const SilverCoin = styled(Coin)`
  &:after {
    background-color: silver;
  }
`;

export const CopperCoin = styled(Coin)`
  &:after {
    background-color: brown;
  }
`;

interface GoldAmountProps {
  amount: number | null;
}

export const GoldAmount: React.FC<GoldAmountProps> = ({ amount }) => {
  const { g, s, c } = React.useMemo(() => {
    if (amount === null) {
      return {
        g: "-",
        s: "-",
        c: "-",
      };
    }

    const g = Math.floor(amount / 10000);
    const s = Math.floor((amount % 10000) / 100);
    const c = amount % 100;
    return {
      g,
      s,
      c,
    };
  }, [amount]);

  return (
    <span>
      <GoldCoin className="mr-2">
        {g} <span className="sr-only">gold</span>
      </GoldCoin>
      <SilverCoin className="mr-2">
        {s} <span className="sr-only">silver</span>
      </SilverCoin>
      <CopperCoin>
        {c} <span className="sr-only">copper</span>
      </CopperCoin>
    </span>
  );
};
