import { TableDataType } from "constants/constants";
import {
  BinanceRawCancelOrder,
  BinanceRawCancelOrderId,
  BinanceRawKlineItemsViewModel,
  BinanceRawOrderBook,
  BinanceRawOrderItemsViewModel,
  BinanceRawPlaceOrder,
  BinanceRawRecentTrade,
  TradingPlatformBinanceOrdersMode
} from "gv-api-web";
import { Bar } from "pages/trade/binance-trade-page/trading/chart/charting_library/datafeed-api";
import { getDividerParts } from "pages/trade/binance-trade-page/trading/order-book/order-book.helpers";
import {
  Account,
  CorrectedRestDepth,
  ExchangeInfo,
  KlineParams,
  OrderSide,
  QueryOrderResult,
  Ticker,
  TradeRequest,
  UnitedOrder,
  UnitedTrade
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { from, Observable } from "rxjs";
import { api } from "services/api-client/swagger-custom-client";
import { OrderRequest } from "services/request.service";
import { CurrencyEnum } from "utils/types";

import {
  transformDepthToString,
  transformKlineBar,
  transformToUnitedOrder
} from "../../api.helpers";

export const getExchangeInfo = (): Promise<ExchangeInfo> =>
  api.terminal().getFuturesExchangeInfo();

export const getKlines = async (params: KlineParams): Promise<Bar[]> => {
  let bars: Bar[] = [];
  const sendRequest = async (startTime: number) => {
    const data = await api
      .terminal()
      .getFuturesKlines(params.symbol, {
        ...params,
        endTime: new Date(params.endTime),
        startTime: new Date(startTime)
      })
      .then(({ items }: BinanceRawKlineItemsViewModel) =>
        items.map(transformKlineBar)
      );
    bars.push.apply(bars, data);
    const length = bars.length;

    if (length === 1000) {
      const lastBar = bars[bars.length - 1];
      const nextTime = lastBar.time + 1;
      await sendRequest(nextTime);
    }
  };

  await sendRequest(params.startTime);

  return bars;
};

export const getServerTime = () => {
  return api.terminal().getExchangeTime();
};

export const getOpenOrders = (
  symbol: string,
  accountId?: string
): Observable<UnitedOrder[]> =>
  from(
    api
      .terminal()
      .getFuturesOpenOrders({ accountId })
      .then(({ items }: BinanceRawOrderItemsViewModel) =>
        items.map(transformToUnitedOrder)
      ) as Promise<UnitedOrder[]>
  );

export const getAllTrades = (filters: {
  accountId?: string;
  mode?: TradingPlatformBinanceOrdersMode;
  dateFrom?: Date;
  dateTo?: Date;
  symbol?: string;
  skip?: number;
  take?: number;
}): Promise<TableDataType<UnitedOrder>> =>
  api
    .terminal()
    .getTradesHistory({ ...filters, mode: "TradeHistory" })
    .then(({ total, items }: BinanceRawOrderItemsViewModel) => ({
      total,
      items: items.map(transformToUnitedOrder)
    }));

export const getAllOrders = (filters: {
  accountId?: string;
  mode?: TradingPlatformBinanceOrdersMode;
  dateFrom?: Date;
  dateTo?: Date;
  symbol?: string;
  skip?: number;
  take?: number;
}): Promise<TableDataType<UnitedOrder>> =>
  api
    .terminal()
    .getTradesHistory({ ...filters, mode: "OrderHistory" })
    .then(({ total, items }: BinanceRawOrderItemsViewModel) => ({
      total,
      items: items.map(transformToUnitedOrder)
    }));

export const getUserStreamKey = (
  accountId?: string
): Observable<{ listenKey: string }> =>
  from(
    api
      .terminal()
      .futuresStartAccountStream({ accountId })
      .then((listenKey: string) => ({ listenKey })) as Promise<{
      listenKey: string;
    }>
  );

export const getAccountInformation = (
  accountId?: string,
  currency?: CurrencyEnum
): Observable<Account> =>
  from(
    api.terminal().getFuturesAccountInfo({ accountId, currency }) as Promise<
      Account
    >
  );

export const getTrades = (
  symbol: string,
  limit: number = 50
): Observable<UnitedTrade[]> =>
  from(
    api
      .terminal()
      .getFuturesSymbolRecentTrades(symbol, { limit })
      .then((items: Array<BinanceRawRecentTrade>) =>
        items.map(({ orderId, price, baseQuantity, tradeTime }) => ({
          quantity: baseQuantity,
          price,
          orderId,
          tradeTime
        }))
      ) as Promise<UnitedTrade[]>
  );

export const getTickers = (symbol: string = ""): Observable<Ticker[]> =>
  from(api.terminal().getFutures24HPrices(symbol) as Promise<Ticker[]>);

export const getDepth = (
  symbol: string,
  tickSize: string = "0.00000001",
  limit: number = 100
): Observable<CorrectedRestDepth> => {
  const dividerParts = getDividerParts(tickSize);
  return from(
    api
      .terminal()
      .getFuturesOrderBook(symbol, { limit })
      .then((data: BinanceRawOrderBook) => ({
        ...data,
        asks: data.asks.map(transformDepthToString(dividerParts)),
        bids: data.bids.map(transformDepthToString(dividerParts))
      })) as Promise<CorrectedRestDepth>
  );
};

export const newOrder = (
  options: OrderRequest,
  accountId?: string
): Promise<any> =>
  api.terminal().futuresPlaceOrder({
    body: {
      ...options,
      price: +options.price!,
      quantity: +options.quantity!
    } as BinanceRawPlaceOrder,
    accountId
  });

export const cancelAllOrders = (
  { symbol }: { symbol?: string; useServerTime?: boolean },
  accountId?: string
): Promise<BinanceRawCancelOrderId[]> =>
  api.terminal().futuresCancelAllOpenOrders({ symbol, accountId });

export const cancelOrder = (
  {
    symbol,
    orderId
  }: { orderId: string; symbol: string; useServerTime?: boolean },
  accountId?: string
): Promise<BinanceRawCancelOrder> =>
  api.terminal().futuresCancelOrder({ orderId, symbol, accountId });

export const postBuy = ({
  reduceOnly,
  timeInForce,
  stopPrice,
  accountId,
  symbol,
  price,
  quantity,
  type
}: TradeRequest & {
  accountId?: string;
}): Promise<QueryOrderResult> => {
  return newOrder(
    {
      reduceOnly,
      stopPrice:
        type === "TakeProfitLimit" || type === "StopLossLimit"
          ? stopPrice
          : undefined,
      symbol,
      type,
      price:
        type === "Limit" ||
        type === "TakeProfitLimit" ||
        type === "StopLossLimit"
          ? String(price)
          : undefined,
      quantity: String(quantity),
      timeInForce,
      side: "Buy"
    },
    accountId
  );
};

export const postSell = ({
  reduceOnly,
  timeInForce,
  stopPrice,
  accountId,
  symbol,
  price,
  quantity,
  type
}: TradeRequest & {
  accountId?: string;
}): Promise<QueryOrderResult> => {
  return newOrder(
    {
      reduceOnly,
      stopPrice:
        type === "TakeProfitLimit" || type === "StopLossLimit"
          ? stopPrice
          : undefined,
      symbol,
      type,
      price:
        type === "Limit" ||
        type === "TakeProfitLimit" ||
        type === "StopLossLimit"
          ? String(price)
          : undefined,
      quantity: String(quantity),
      timeInForce,
      side: "Sell"
    },
    accountId
  );
};

export const getTradeMethod = (side: OrderSide) =>
  side === "Buy" ? postBuy : postSell;

export const tradeRequest = ({
  side,
  ...options
}: TradeRequest & { accountId?: string; side: OrderSide }) => {
  const method = getTradeMethod(side);
  return method(options);
};
