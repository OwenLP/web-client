import classNames from "classnames";
import { ProgramDetailsListItem } from "gv-api-web";
import ProgramCard from "modules/programs-table/components/programs-table/program-card";
import React from "react";

import ProgramShort from "./program-short";
import styles from "./programs-list.module.scss";

interface Props {
  className?: string;
  programs: ProgramDetailsListItem[];
}

const _ProgramsList: React.FC<Props> = ({ className, programs }) => {
  return (
    <ul className={classNames(styles["programs-list"], className)}>
      {programs.map((program, index) => (
        <li className={styles["programs-list__item"]} key={program.id}>
          <ProgramCard key={program.id} program={program} />
          {index > 1 && <ProgramShort program={program} />}
        </li>
      ))}
    </ul>
  );
};

const ProgramsList = React.memo(_ProgramsList);
export default ProgramsList;
