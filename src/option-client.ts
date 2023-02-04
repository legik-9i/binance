import { AxiosRequestConfig } from 'axios';

import {

  BasicSymbolParam,
  BinanceBaseUrlKey, CancelOrderParams, OrderBookParams,

} from './types/shared';



import {
  generateNewOrderId,
  getOrderIdPrefix,
  getServerTimeEndpoint,
  logInvalidOrderId,
  RestClientOptions,
} from './util/requestUtils';

import BaseRestClient from './util/BaseRestClient';
import { NewOptionOrderParams, OptionsExchangeInfo, OptionsIndex, OptionsOrderBook } from './types/options';
import { CancelFuturesOrderResult, NewFuturesOrderParams, NewOrderError, NewOrderResult, OrderResult } from './types/futures';

type OptionUnderlyingParam = {
  underlying: string
}

type GetOrderParams = {
  symbol: string,
  orderId?: string,
  clientOrderId?: string
}

// https://binance-docs.github.io/apidocs/voptions/en/#general-api-information
export class OptionClient extends BaseRestClient {
  private clientId: BinanceBaseUrlKey;

  constructor(
    restClientOptions: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {},
    useTestnet?: boolean
  ) {
    const clientId = useTestnet ? 'eoptions' : 'eoptionstest';
    super(clientId, restClientOptions, requestOptions);

    this.clientId = clientId;
    return this;
  }

  /**
   * Abstraction required by each client to aid with time sync / drift handling
   */
  async getServerTime(): Promise<number> {
    return this.get(getServerTimeEndpoint(this.clientId)).then(
      (response) => response.serverTime
    );
  }

  getExchangeInfo(): Promise<OptionsExchangeInfo> {
    return this.get("eapi/v1/exchangeInfo")
  }
  
  getIndex(params: OptionUnderlyingParam): Promise<OptionsIndex> {
    return this.get("eapi/v1/index", params)
  }
  getOrderBook(params: OrderBookParams): Promise<OptionsOrderBook> {
    return this.get("eapi/v1/depth", params)
  }


  submitNewOrder(
    params: NewOptionOrderParams
  ): Promise<NewOrderResult | NewOrderError> {
    // this.validateOrderId(params, 'newClientOrderId');
    return this.postPrivate('eapi/v1/order', params);
  }

  cancelOrder(params: CancelOrderParams): Promise<CancelFuturesOrderResult> {
    return this.deletePrivate('eapi/v1/order', params);
  }
  

  getAllOpenOrders(params?: Partial<BasicSymbolParam>): Promise<OrderResult[]> {
    return this.getPrivate('eapi/v1/openOrders', params);
  }

  getOrder(params: GetOrderParams): Promise<OrderResult> {
    return this.getPrivate('eapi/v1/order', params);
  }

  cancelAllOrders(params: BasicSymbolParam): Promise<any> {
    return this.deletePrivate('eapi/v1/allOpenOrders', params)
  }

  
 
}
