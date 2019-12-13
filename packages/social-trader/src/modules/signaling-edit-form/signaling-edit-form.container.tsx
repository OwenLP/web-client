import useApiRequest from "hooks/api-request.hook";
import SignalingEdit, {
  IProgramSignalFormValues
} from "modules/signaling-edit-form/signaling-edit";
import { editSignal } from "modules/signaling-edit-form/signaling-edit-form.service";
import React, { useCallback } from "react";

const _SignalingEditFormContainer: React.FC<Props> = ({
  id,
  onApply = () => {},
  showFields = true,
  successFee,
  volumeFee
}) => {
  const { sendRequest: editSignalRequest } = useApiRequest({
    middleware: [onApply],
    request: editSignal,
    successMessage: "program-edit-signal.success-alert-message"
  });
  const changeSignaling = useCallback(
    ({ volumeFee, successFee }: IProgramSignalFormValues, setSubmitting) =>
      editSignalRequest(
        {
          id,
          successFee,
          volumeFee
        },
        setSubmitting
      ),
    [id]
  );
  return (
    <SignalingEdit
      showFields={showFields}
      successFee={successFee}
      volumeFee={volumeFee}
      onSubmit={changeSignaling}
    />
  );
};

interface Props {
  id: string;
  showFields?: boolean;
  successFee?: number;
  volumeFee?: number;
  onApply?: VoidFunction;
}

export const SignalingEditFormContainer = React.memo(
  _SignalingEditFormContainer
);
