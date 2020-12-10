import { dispatch } from 'pages/_app'
import {
  CHANGE_LANGUAGE,
  CHANGE_CURRENCY_UNIT,
} from '../constants'


export const changeAppLanguage = lang => dispatch({ type: CHANGE_LANGUAGE, payload: lang })

export const changeCurrencyUnit = unit => dispatch({ type: CHANGE_CURRENCY_UNIT, payload: unit })
