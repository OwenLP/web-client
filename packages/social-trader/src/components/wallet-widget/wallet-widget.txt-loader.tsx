import "./wallet-widget.scss";

import classNames from "classnames";
import Chip, { CHIP_TYPE } from "components/chip/chip";
import { WalletIcon } from "components/icon/wallet-icon";
import { WalletsGrandTotal } from "gv-api-web";
import * as React from "react";
import { getRandomInteger, getRandomText } from "utils/helpers";

export const WalletWidgetLoaderData: WalletsGrandTotal = {
  currency: "GVT",
  available: getRandomInteger(),
  invested: getRandomInteger(),
  trading: getRandomInteger(),
  total: getRandomInteger()
};

export const WalletWidgetTxtLoader: React.FC<{
  className?: string;
}> = React.memo(({ className }) => (
  <div className={classNames("wallet-widget", className)}>
    <div className="wallet-widget__wallet">
      <WalletIcon />
      <span className="wallet-widget__value">
        <div className="wallet-widget__loader">
          {getRandomText({
            length: getRandomInteger(3, 9),
            charset: "numeric"
          })}{" "}
          {getRandomText({
            length: getRandomInteger(3, 4),
            charset: "alphabetic"
          })}
        </div>
      </span>
    </div>
    <div className="wallet-widget__add">
      <Chip type={CHIP_TYPE.POSITIVE}>+</Chip>
    </div>
  </div>
));
