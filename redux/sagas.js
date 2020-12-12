import { all, takeEvery } from '@redux-saga/core/effects'
import { getCurrUnit, getMarket } from './actions/listsActions'
import {
  GET_CURRENCY_UNIT_START,
  GET_MARKET_LIST_START,
} from './constants'


export default function* rootSaga() {
  yield all([
    takeEvery(GET_CURRENCY_UNIT_START, getCurrUnit),
    takeEvery(GET_MARKET_LIST_START, getMarket),
  ])
}
