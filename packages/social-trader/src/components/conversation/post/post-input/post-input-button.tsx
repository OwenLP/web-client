import classNames from "classnames";
import React from "react";
import { SizesType } from "utils/types";

import styles from "./post-input.module.scss";

const _PostInputButton: React.FC<Props> = ({
  size = "middle",
  children,
  onClick
}) => {
  return (
    <div
      className={classNames(styles["post-input__button"], {
        [styles["post-input__button--small"]]: size === "small",
        [styles["post-input__button--middle"]]: size === "middle"
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface Props {
  size?: SizesType;
  children?: string | JSX.Element;
  onClick?: VoidFunction;
}

export const PostInputButton = React.memo(_PostInputButton);
