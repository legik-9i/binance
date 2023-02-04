import { FuturesOrderType, PositionSide, WorkingType } from './futures';
import { OrderBookRow, SymbolFilter, RateLimiter, OrderSide, OrderTimeInForce, BooleanString, OrderResponseType, numberInString, OrderStatus } from './shared';


// https://binance-docs.github.io/apidocs/voptions/en/#general-api-information

export interface OptionsOrderBook {
  T: number;
  bids: OrderBookRow[];
  asks: OrderBookRow[];
}

export enum OptionsUnderlining {
  ETHUSDT = "ETHUSDT",
  BTCUSDT = 'BTCUSDT',
  BNBUSDT = 'BNBUSDT'
}

export enum OPTION_SIDE {
  PUT= 'PUT',
  CALL = 'CALL'
}

export interface OptionsSymbolExchangeInfo {
  symbol: string;
  expiryDate: number,

  quoteAsset: string;
  priceScale: number;
  quantityScale: number;
  filters: SymbolFilter[];
  underlying: OptionsUnderlining;

  side: OPTION_SIDE;
  strikePrice: number
}

export interface OptionsExchangeInfo {
  // exchangeFilters: ExchangeFilter[];
  rateLimits: RateLimiter[];
  serverTime: number;
  assets: any[];
  optionSymbols: OptionsSymbolExchangeInfo[];
  timezone: string;
}

export interface OptionsIndex {
  time: number,
  indexPrice: number
}

export type OptionsOrderType =
  | 'LIMIT'

export interface OptionsOrderBook {
  lastUpdateId: number;
  T: number;
  bids: OrderBookRow[];
  asks: OrderBookRow[];
}


export interface NewOptionOrderParams<numberType = number> {
  symbol: string;
  side: OrderSide;
  type: OptionsOrderType;
  timeInForce?: OrderTimeInForce;
  quantity?: numberType;
  reduceOnly?: BooleanString;
  price?: numberType;
  clientOrderId?: string;
  // stopPrice?: numberType;
  // closePosition?: BooleanString;
  // activationPrice?: numberType;
  // callbackRate?: numberType;
  // workingType?: WorkingType;
  // priceProtect?: BooleanStringCapitalised;
  newOrderRespType?: OrderResponseType;
}

export interface NewOptionsOrderResult {
  clientOrderId: string;
  cumQty: numberInString;
  cumQuote: numberInString;
  executedQty: numberInString;
  orderId: number;
  avgPrice: numberInString;
  origQty: numberInString;
  price: numberInString;
  reduceOnly: boolean;
  side: OrderSide;
  positionSide: PositionSide;
  status: OrderStatus;
  stopPrice: numberInString;
  closePosition: boolean;
  symbol: string;
  timeInForce: OrderTimeInForce;
  type: FuturesOrderType;
  origType: FuturesOrderType;
  activatePrice: numberInString;
  priceRate: numberInString;
  updateTime: number;
  workingType: WorkingType;
  priceProtect: boolean;
}
