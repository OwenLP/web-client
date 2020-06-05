import { ColoredTextColor } from "components/colored-text/colored-text";
import {
  LevelsSum,
  OrderBookRow
} from "pages/trades/binance-trade-page/trading/order-book/order-book.row";
import { StringBidDepth } from "pages/trades/binance-trade-page/trading/terminal.types";
import React, { useEffect, useState } from "react";
import { getPercentageValue } from "utils/helpers";

import styles from "./order-book.module.scss";

interface Props {
  fullAmount: number;
  tableTickSize?: string;
  reverse?: boolean;
  items?: StringBidDepth[];
  color: ColoredTextColor;
}

const _OrderBookTable: React.FC<Props> = ({
  fullAmount,
  tableTickSize,
  reverse,
  color,
  items = []
}) => {
  const [hoveredRow, setHoveredRow] = useState<number | undefined>();
  const [levelSum, setLevelSum] = useState<LevelsSum>({
    avgPrice: 0,
    baseSum: 0,
    quoteSum: 0
  });

  useEffect(() => {
    if (hoveredRow !== undefined) {
      const first = reverse ? hoveredRow : 0;
      const last = reverse ? items.length : hoveredRow + 1;
      const selectedItems = items.slice(first, last);
      const avgPrice =
        selectedItems.reduce((sum, [price]) => sum + +price, 0) /
        (last - first);
      const baseSum = selectedItems.reduce(
        (sum, [_, amount]) => sum + +amount,
        0
      );
      const quoteSum = selectedItems.reduce(
        (sum, [price, amount]) => sum + +price * +amount,
        0
      );
      setLevelSum({ avgPrice, baseSum, quoteSum });
    }
  }, [hoveredRow, items]);

  return (
    <table className={styles["order-book__table"]}>
      <tbody>
        {items.map(([price, amount], i) => {
          const total = +price * +amount;
          return (
            <OrderBookRow
              barPercent={100 - getPercentageValue(total, fullAmount)}
              tableTickSize={tableTickSize}
              hovered={
                hoveredRow !== undefined &&
                (reverse ? i >= hoveredRow : i <= hoveredRow)
              }
              levelSum={hoveredRow === i ? levelSum : undefined}
              index={i}
              setHoveredRow={setHoveredRow}
              color={color}
              price={price}
              amount={amount}
              total={total}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export const OrderBookTable = React.memo(_OrderBookTable);
