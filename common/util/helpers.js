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