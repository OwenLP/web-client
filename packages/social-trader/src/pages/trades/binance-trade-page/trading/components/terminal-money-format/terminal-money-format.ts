import { getDecimalScale } from "pages/trades/binance-trade-page/trading/trading.helpers";
import { formatValue } from "utils/formatter";

export const terminalMoneyFormat = ({
  tickSize,
  digits = 2,
  amount
}: {
  amount: number | string;
  digits?: number;
  tickSize?: string;
  currency?: string;
}): string => {
  const decimalScale = tickSize
    ? getDecimalScale(formatValue(tickSize))
    : undefined;
  return (+amount).toFixed(decimalScale || digits);
};
