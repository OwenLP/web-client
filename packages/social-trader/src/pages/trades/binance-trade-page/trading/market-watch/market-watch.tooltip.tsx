import { Center } from "components/center/center";
import GVButton from "components/gv-button";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  ORIENTATION_POPOVER,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import { RowItem } from "components/row-item/row-item";
import FilterArrowIcon from "components/table/components/filtering/filter-arrow-icon";
import useAnchor from "hooks/anchor.hook";
import { MarketWatchContainer } from "pages/trades/binance-trade-page/trading/market-watch/market-watch.container";
import { TradeCurrency } from "pages/trades/binance-trade-page/trading/trading.types";
import React from "react";

import styles from "./market-watch.module.scss";

interface Props {
  baseAsset: TradeCurrency;
  quoteAsset: TradeCurrency;
}

export const MarketWatchTooltipButton: React.FC<Props> = ({
  baseAsset,
  quoteAsset
}) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  return (
    <>
      <GVButton variant={"text"} noPadding onClick={setAnchor}>
        <Center>
          <RowItem small>
            <Center>
              <FilterArrowIcon isOpen={anchor !== undefined} />
            </Center>
          </RowItem>
          <RowItem>
            <h3>
              {baseAsset}/{quoteAsset}
            </h3>
          </RowItem>
        </Center>
      </GVButton>
      <Popover
        vertical={VERTICAL_POPOVER_POS.BOTTOM}
        fixedVertical
        fixedHorizontal
        anchorEl={anchor}
        onClose={clearAnchor}
        horizontal={HORIZONTAL_POPOVER_POS.LEFT}
        orientation={ORIENTATION_POPOVER.RIGHT}
        noPadding
      >
        <PopoverContentCardBlock className={styles["market-watch__tooltip"]}>
          <div className={styles["market-watch__tooltip-data"]}>
            <MarketWatchContainer />
          </div>
        </PopoverContentCardBlock>
      </Popover>
    </>
  );
};
