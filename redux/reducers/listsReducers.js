import { createReducer } from 'common/util/reducerUtil'
import { 
  GET_CURRENCY_UNIT_SUCCESS, GET_CURRENCY_UNIT_FAILED
} from '../constants'

const initialState = {}

const getCurUnitSuccess = (state, payload) => ({ ...state, currUnit: payload })
const getCurUnitFailed = state => ({ ...state, currUnit: {} })


export default createReducer(initialState, {
  [GET_CURRENCY_UNIT_SUCCESS]: getCurUnitSuccess,
  [GET_CURRENCY_UNIT_FAILED]: getCurUnitFailed,
})
