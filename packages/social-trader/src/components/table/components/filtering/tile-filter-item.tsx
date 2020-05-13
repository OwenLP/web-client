import { CloseIcon } from "components/icon/close-icon";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import * as React from "react";

import styles from "./tile-filter.module.scss";

const _TileFilterItem: React.FC<ITileFilterItemProps> = ({
  removable = true,
  mandatory,
  id,
  removeTile,
  children
}) => {
  return (
    <RowItem>
      <Row className={styles["tile-filter-item"]}>
        {children}
        {!mandatory && removable && (
          <div
            className={styles["tile-filter-item__button-remove"]}
            onClick={() => removeTile!(id)}
          >
            <div className={styles["tile-filter-item__icon"]}>
              <CloseIcon />
            </div>
          </div>
        )}
      </Row>
    </RowItem>
  );
};

const TileFilterItem = React.memo(_TileFilterItem);
export default TileFilterItem;

export interface ITileFilterItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  removable?: boolean;
  id: string;

  removeTile?(id: string): void;

  mandatory?: boolean;
}
