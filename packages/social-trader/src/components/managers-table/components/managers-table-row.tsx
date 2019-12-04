import "./managers-table.scss";

import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import GVButton from "components/gv-button";
import Link from "components/link/link";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import * as React from "react";
import { managerToPathCreator } from "routes/manager.routes";
import { localizedDate } from "shared/utils/dates";

type ManagerProfile = any;

interface IManagersTableRowProps {
  manager: ManagerProfile;
  title: any;
}
const _ManagersTableRow: React.FC<IManagersTableRowProps> = ({
  manager,
  title
}) => {
  return (
    <TableRow className="managers-table__row">
      <TableCell className="managers-table__cell--username">
        <ProfileAvatar url={manager.avatar} alt={manager.username} />
        <Link to={managerToPathCreator(manager.url, title)}>
          <GVButton variant="text" color="secondary">
            {manager.username}
          </GVButton>
        </Link>
      </TableCell>
      <TableCell className="">{manager.assets.join(", ")}</TableCell>
      <TableCell className="">{localizedDate(manager.regDate)}</TableCell>
    </TableRow>
  );
};

const ManagersTableRow = React.memo(_ManagersTableRow);
export default ManagersTableRow;
