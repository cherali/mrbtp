import { call } from 'redux-saga/effects'
import apiCall from 'common/network/apiCall'
import { currencyUrl } from 'common/urls'
import { GET_CURRENCY_UNIT_SUCCESS, GET_CURRENCY_UNIT_FAILED } from '../constants'

export function* getCurrUnit({ unit }) {
  yield call(apiCall, {
    method: 'get',
    url: `${currencyUrl}/rate?symbol=${unit}`,
    successType: GET_CURRENCY_UNIT_SUCCESS,
    failType: GET_CURRENCY_UNIT_FAILED,
  })
}
