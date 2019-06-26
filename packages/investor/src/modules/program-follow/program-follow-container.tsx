import {
  AttachToSignalProviderInfo,
  SignalSubscription,
  WalletData
} from "gv-api-web";
import * as React from "react";
import { connect } from "react-redux";
import { InvestorRootState } from "reducers";
import { Dispatch, bindActionCreators } from "redux";
import Dialog from "shared/components/dialog/dialog";
import { DialogLoader } from "shared/components/dialog/dialog-loader/dialog-loader";
import { walletsSelector } from "shared/components/wallet/reducers/wallet.reducers";
import { FOLLOW_TYPE } from "shared/constants/constants";
import {
  AlertActionCreator,
  alertMessageActions
} from "shared/modules/alert-message/actions/alert-message-actions";
import { rateApi } from "shared/services/api-client/rate-api";
import authService from "shared/services/auth-service";
import { CurrencyEnum } from "shared/utils/types";

import FollowPopupForm from "./follow-popup/follow-popup-form";
import {
  attachToSignal,
  getSignalInfo,
  updateAttachToSignal
} from "./services/program-follow-service";

class _ProgramFollowContainer extends React.PureComponent<Props, State> {
  state: State = {
    rate: 1,
    isPending: false,
    type: undefined,
    volumeFee: undefined,
    minDeposit: undefined
  };

  componentDidMount() {
    if (!authService.getAuthArg()) return; // TODO change to HOC
    const { id, signalSubscription, currency } = this.props;
    this.setState({ isPending: true });
    getSignalInfo(id)
      .then((info: AttachToSignalProviderInfo) => {
        const { volumeFee, minDeposit } = info;
        this.setState({
          type: signalSubscription.hasActiveSubscription
            ? FOLLOW_TYPE.EDIT
            : FOLLOW_TYPE.CREATE,
          volumeFee,
          minDeposit,
          isPending: false
        });
        return rateApi.v10RateByFromByToGet("USD", currency);
      })
      .then(rate => this.setState({ rate }));
  }

  render() {
    const {
      service,
      wallets,
      open,
      onClose,
      currency,
      id,
      signalSubscription
    } = this.props;
    const { isPending, type, minDeposit, rate } = this.state;
    const handleClose = () => {
      onClose();
    };
    const handleSubmit = () => {
      this.props.onApply();
      onClose();
    };
    const submitMethod =
      type === FOLLOW_TYPE.CREATE ? attachToSignal : updateAttachToSignal;
    return (
      <Dialog open={open} onClose={handleClose}>
        <FollowPopupForm
          rate={rate}
          condition={!isPending && !!wallets.length}
          loader={<DialogLoader />}
          signalSubscription={signalSubscription}
          minDeposit={minDeposit!}
          alertError={service.alertError}
          alertSuccess={service.alertSuccess}
          id={id}
          currency={currency}
          wallets={wallets}
          submitMethod={submitMethod}
          handleSubmit={handleSubmit}
        />
      </Dialog>
    );
  }
}

const mapStateToProps = (state: InvestorRootState): StateProps => ({
  wallets: walletsSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators(
    {
      alertError: alertMessageActions.error,
      alertSuccess: alertMessageActions.success
    },
    dispatch
  )
});

interface DispatchProps {
  service: { alertError: AlertActionCreator; alertSuccess: AlertActionCreator };
}

interface StateProps {
  wallets: WalletData[];
}

interface Props extends DispatchProps, StateProps {
  open: boolean;
  onClose(): void;
  onApply(): void;
  currency: CurrencyEnum;
  id: string;
  signalSubscription: SignalSubscription;
}

interface State {
  isPending: boolean;
  volumeFee?: number;
  minDeposit?: number;
  type?: FOLLOW_TYPE;
  rate: number;
}

const ProgramFollowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ProgramFollowContainer);
export default ProgramFollowContainer;
