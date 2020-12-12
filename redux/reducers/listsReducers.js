import { createReducer } from 'common/util/reducerUtil'
import {
  GET_CURRENCY_UNIT_SUCCESS, GET_CURRENCY_UNIT_FAILED,
  GET_MARKET_LIST_SUCCESS, GET_MARKET_LIST_FAILED,
  GET_FIAT_LIST_SUCCESS, GET_FIAT_LIST_FAILED,
  GET_LANGUAGE_LIST_SUCCESS, GET_LANGUAGE_LIST_FAILED,
} from '../constants'

const initialState = {
  marketList: []
}

const getCurUnitSuccess = (state, payload) => ({ ...state, currUnit: payload })
const getCurUnitFailed = state => ({ ...state, currUnit: {} })

const getMarketListSuccess = (state, payload) => ({ ...state, marketList: payload })
const getMarketListFailed = state => ({ ...state, marketList: {} })

const getFiatListSuccess = (state, payload) => ({ ...state, fiatList: payload })
const getFiatListFailed = state => ({ ...state, fiatList: {} })

const getLanguageListSuccess = (state, payload) => ({ ...state, languageList: payload })
const getLanguageListFailed = state => ({ ...state, languageList: [] })


export default createReducer(initialState, {
  [GET_CURRENCY_UNIT_SUCCESS]: getCurUnitSuccess,
  [GET_CURRENCY_UNIT_FAILED]: getCurUnitFailed,

  [GET_MARKET_LIST_SUCCESS]: getMarketListSuccess,
  [GET_MARKET_LIST_FAILED]: getMarketListFailed,

  [GET_FIAT_LIST_SUCCESS]: getFiatListSuccess,
  [GET_FIAT_LIST_FAILED]: getFiatListFailed,

  [GET_LANGUAGE_LIST_SUCCESS]: getLanguageListSuccess,
  [GET_LANGUAGE_LIST_FAILED]: getLanguageListFailed,
})
