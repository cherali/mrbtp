import { all, takeEvery } from '@redux-saga/core/effects'
import { getCoins } from './actions/listsActions'
import { GET_COIN_LIST_START } from './constants'


export default function* rootSaga() {
  yield all([
    takeEvery(GET_COIN_LIST_START, getCoins),
  ])
}
