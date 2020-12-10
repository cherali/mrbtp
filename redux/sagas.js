import { all, takeEvery } from '@redux-saga/core/effects'
import { getCurrUnit } from './actions/listsActions'
import { GET_CURRENCY_UNIT_START } from './constants'


export default function* rootSaga() {
  yield all([
    takeEvery(GET_CURRENCY_UNIT_START, getCurrUnit),
  ])
}
