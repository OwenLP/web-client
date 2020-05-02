import classNames from "classnames";
import ImageBaseElement from "components/avatar/image-base.element";
import { useTranslation } from "i18n";
import React from "react";

import styles from "./tab-controls.module.scss";

export type TTabsItem = {
  id: number;
  text?: string;
  image?: {
    link: string;
    title?: string;
  };
};

interface Props {
  currentTabId: number;
  tabsItems: TTabsItem[];
  onChange: (id: number) => void;
  className?: string;
}

const _TabControls: React.FC<Props> = ({
  currentTabId,
  tabsItems,
  onChange,
  className
}) => {
  const { t } = useTranslation();
  return (
    <ul className={classNames("tab-controls", className)}>
      {tabsItems.map((tab, index) => (
        <li
          key={index}
          className={classNames(styles["tab-controls__item"], {
            [styles["tab-controls__item--active"]]: currentTabId === tab.id
          })}
        >
          <button
            onClick={() => onChange(tab.id)}
            type="button"
            className={styles["tab-controls__item-btn"]}
          >
            {tab.text && t(tab.text)}
            {tab.image && (
              <ImageBaseElement
                className={styles["tab-controls__item-img"]}
                src={tab.image.link}
                alt={tab.image.title}
                title={tab.image.title}
              />
            )}
          </button>
        </li>
      ))}
    </ul>
  );
};

const TabControls = React.memo(_TabControls);
export default TabControls;
