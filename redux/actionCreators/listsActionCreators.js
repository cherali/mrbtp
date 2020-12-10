import { dispatch } from 'pages/_app'
import {
  GET_CURRENCY_UNIT_START
} from '../constants'


export const getCurrencyUnit = unit => dispatch({ type: GET_CURRENCY_UNIT_START, unit })
