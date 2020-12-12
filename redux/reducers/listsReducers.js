import { createReducer } from 'common/util/reducerUtil'
import { 
  GET_CURRENCY_UNIT_SUCCESS, GET_CURRENCY_UNIT_FAILED,
  GET_MARKET_LIST_SUCCESS, GET_MARKET_LIST_FAILED,
} from '../constants'

const initialState = {
  marketList: []
}

const getCurUnitSuccess = (state, payload) => ({ ...state, currUnit: payload })
const getCurUnitFailed = state => ({ ...state, currUnit: {} })

const getMarketListSuccess = (state, payload) => ({ ...state, marketList: payload })
const getMarketListFailed = state => ({ ...state, marketList: {} })


export default createReducer(initialState, {
  [GET_CURRENCY_UNIT_SUCCESS]: getCurUnitSuccess,
  [GET_CURRENCY_UNIT_FAILED]: getCurUnitFailed,

  [GET_MARKET_LIST_SUCCESS]: getMarketListSuccess, 
  [GET_MARKET_LIST_FAILED]: getMarketListFailed,
})
