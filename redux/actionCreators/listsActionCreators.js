import { dispatch } from 'pages/_app'
import {
  GET_CURRENCY_UNIT_START,
  GET_MARKET_LIST_START,
  GET_FIAT_LIST_START,
} from '../constants'


export const getCurrencyUnit = unit => dispatch({ type: GET_CURRENCY_UNIT_START, unit })

export const getMarketList = () => dispatch({ type: GET_MARKET_LIST_START })

export const getFiatList = () => dispatch({ type: GET_FIAT_LIST_START })
