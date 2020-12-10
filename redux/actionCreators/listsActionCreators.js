import { dispatch } from 'pages/_app'
import {
  GET_COIN_LIST_START
} from '../constants'


export const getCoinsList = () => dispatch({ type: GET_COIN_LIST_START })
