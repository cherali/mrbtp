export const objectToArray = obj => Object.entries(obj).map(e => e[1])

export const toCurrency = cur => (cur).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')

export function toFarsiNumber(n) {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

  return n
    .toString()
    .replace(/\d/g, x => farsiDigits[x]);
}

export function toEnglishNumber(str) {
  const farsiDigits = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  if (typeof str === 'string') {
    for (var i = 0; i < 10; i++) {
      str = str.replace(farsiDigits[i], i);
    }
    return str;
  } else {
    return str;
  }
}

export const clacValue = (base, price, unit) => {
  const result = (Number(base) * Number(price)).toFixed(2)
  const curr = toCurrency(Number(result))
  return unit === 'IRT' ? toFarsiNumber(curr) : curr
}

const CODES = {
  BTC: 1,
  ETH: 2,
  USDT: 3,
  BCH: 4,
  DOGE: 5,
  LTC: 6,
  DASH: 7,
}

// use to convert data coming from pust to array and add a symbol key to be ready compare with existed coin list
export const prepareIncomingCoinList = obj => objectToArray(obj).map(item => ({ ...item, symbol: `${item.b}/${item.q}` }))

const objectMapper = (arr, key) => arr.reduce((ac, cu) => ({ ...!ac[key] ? { ...ac } : { [ac[key]]: { ...ac } }, ...ac[cu[key]] ? { [cu[key]]: { ...ac[cu[key]], ...cu } } : { [cu[key]]: { ...cu, ...ac[cu[key]] } } }), {})

// use to combine objects in array under a key. objects with provided key combined to one
export const combineObjectInArray = (arr, key = 'symbol') => objectToArray(objectMapper(arr, key))

// filter data base on currency unit (selected) add code to prevent change showing order then sort arr by code
export const coinsData = (arr, unit) => arr.filter(c => c.symbol.split('/')[1] === 'USDT')
  .reduce((ac, cu) => ([...ac, { ...cu, code: CODES[cu.base.symbol] }]), [])
  .sort((a, b) => a.code - b.code)

export const calcChages = (open = 1, close = 1, unit) => {
  const res = (100 * (close - open)/open).toFixed(2)
  return unit === 'IRT' ? toFarsiNumber(res) : res
}