import { Broker, CancelablePromise } from "gv-api-web";
import brokersApi from "services/api-client/brokers-api";

const GM_BROKER_NAME = "Genesis Markets";

export const fetchBrokers = (): CancelablePromise<Broker[]> =>
  brokersApi
    .getBrokers()
    .then(data =>
      data.brokers.sort(
        (a, b) => +(b.name === GM_BROKER_NAME) - +(a.name === GM_BROKER_NAME)
      )
    );
