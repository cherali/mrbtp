import { call } from 'redux-saga/effects'
import apiCall from 'common/network/apiCall'
import { currencyUrl, tradeUrl, generalUrl } from 'common/urls'
import {
  GET_CURRENCY_UNIT_SUCCESS, GET_CURRENCY_UNIT_FAILED,
  GET_MARKET_LIST_SUCCESS, GET_MARKET_LIST_FAILED,
  GET_FIAT_LIST_SUCCESS, GET_FIAT_LIST_FAILED,
  GET_LANGUAGE_LIST_SUCCESS, GET_LANGUAGE_LIST_FAILED,
} from '../constants'

export function* getCurrUnit({ unit }) {
  yield call(apiCall, {
    method: 'get',
    url: `${currencyUrl}/rate?symbol=${unit}`,
    successType: GET_CURRENCY_UNIT_SUCCESS,
    failType: GET_CURRENCY_UNIT_FAILED,
  })
}


export function* getMarket() {
  yield call(apiCall, {
    method: 'get',
    url: `${tradeUrl}/market/list`,
    successType: GET_MARKET_LIST_SUCCESS,
    failType: GET_MARKET_LIST_FAILED,
  })
}

export function* getFiat() {
  yield call(apiCall, {
    method: 'get',
    url: `${currencyUrl}/fiat/list`,
    successType: GET_FIAT_LIST_SUCCESS,
    failType: GET_FIAT_LIST_FAILED,
  })
}

export function* getLanguages() {
  yield call(apiCall, {
    method: 'get',
    url: `${generalUrl}/language/list`,
    successType: GET_LANGUAGE_LIST_SUCCESS,
    failType: GET_LANGUAGE_LIST_FAILED,
  })
}
