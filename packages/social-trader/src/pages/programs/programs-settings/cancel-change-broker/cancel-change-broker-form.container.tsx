import { getBrokersProgramInfoLoaderData } from "components/assets/asset.helpers";
import { MigrationRequest } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import { getProgramBrokersMethod } from "pages/programs/program-details/service/program-details.service";
import { cancelChangeBrokerMethod } from "pages/programs/programs-settings/services/program-settings.service";
import React, { useCallback } from "react";

import CancelChangeBrokerForm from "./cancel-change-broker-form";

const _CancelChangeBrokerFormContainer: React.FC<
  ICancelChangeBrokerFormContainerProps
> = props => {
  const { id, onApply } = props;
  const { sendRequest: cancelChangeBroker } = useApiRequest({
    middleware: [onApply],
    request: cancelChangeBrokerMethod,
    successMessage: "program-settings.notifications.broker-success"
  });
  const handleCancelChangeBroker = useCallback(() => {
    cancelChangeBroker(id);
  }, [id]);
  const { data } = useApiRequest({
    fetchOnMountData: props.id,
    fetchOnMount: true,
    request: getProgramBrokersMethod
  });
  if (!data) return null;
  return (
    <CancelChangeBrokerForm
      onSubmit={handleCancelChangeBroker}
      loaderData={getBrokersProgramInfoLoaderData()}
      data={data}
      {...props}
    />
  );
};

export interface ICancelChangeBrokerFormContainerProps {
  onApply: VoidFunction;
  id: string;
  isSignalProgram: boolean;
  leverage: number;
  migration: MigrationRequest;
}

const CancelChangeBrokerFormContainer = React.memo(
  _CancelChangeBrokerFormContainer
);
export default CancelChangeBrokerFormContainer;
