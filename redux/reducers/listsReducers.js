import { createReducer } from 'common/util/reducerUtil'
import { 
  GET_COIN_LIST_SUCCESS, GET_COIN_LIST_FAILED,
} from '../constants'

const initialState = {}

const getCoinsSuccess = (state, payload) => ({ ...state, coinsList: payload })
const getCoinsFailed = state => ({ ...state, coinsList: [] })


export default createReducer(initialState, {
  [GET_COIN_LIST_SUCCESS]: getCoinsSuccess,
  [GET_COIN_LIST_FAILED]: getCoinsFailed,
})
