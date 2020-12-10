import { createReducer } from 'common/util/reducerUtil'
import {
  CHANGE_LANGUAGE,
  CHANGE_CURRENCY_UNIT,
} from '../constants'

const initialState = {
  language: 'Fa',
  currencyUnit: 'IRT'
}

const changeLang = (state, payload) => ({ ...state, language: payload })
const changeCurrency = (state, payload) => ({ ...state, currencyUnit: payload })


export default createReducer(initialState, {
  [CHANGE_LANGUAGE]: changeLang,
  [CHANGE_CURRENCY_UNIT]: changeCurrency,
})
