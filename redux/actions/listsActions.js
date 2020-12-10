import { call } from 'redux-saga/effects'
import apiCall from 'common/network/apiCall'
import { currencyUrl } from 'common/urls'
import { GET_COIN_LIST_SUCCESS, GET_COIN_LIST_FAILED } from '../constants'

export function* getCoins() {

  yield call(apiCall, {
    method: 'get',
    url: `${currencyUrl}/coin/list`,
    successType: GET_COIN_LIST_SUCCESS,
    failType: GET_COIN_LIST_FAILED,
  })
}
