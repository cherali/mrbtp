import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Pusher from 'pusher-js'
import coinNames from './coinName.json'
import { darkColor, darkGrayColor, redColor, successColor } from 'common/mainStyle/theme'
import { clacValue, combineObjectInArray, prepareIncomingCoinList, coinsData, calcChages, toEnglishNumber } from 'common/util/helpers'
import { getMarketList } from 'redux/actionCreators/listsActionCreators'

const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
  wsHost: process.env.WS_HOST,
  wsPort: process.env.WS_PORT,
  wssPort: process.env.WSS_PORT,
  forceTLS: process.env.USE_TLS,
})



const TABLE_HEADS = [
  { Fa: '#', En: '#', classes: 't-1' },
  { Fa: 'نام', En: 'Name', classes: 't-2' },
  { Fa: 'قیمت', En: 'Price' },
  { Fa: 'تغییرات', En: 'Change' },
  { Fa: 'نمودار', En: 'Chart' },
  { Fa: 'خرید/فروش', En: 'buy/sell' },
]

const CURRENCY_SYMS = {
  'IRT': { Fa: 'تومان', En: 'IRT' },
  'USD': { Fa: '$', En: '$' },
  'TRY': { Fa: '₺', En: '₺' },
}

function CoinsTable() {
  const [updatedCoin, setUpdatedCoin] = useState([])

  const lang = useSelector(s => s.settings.language)
  const unit = useSelector(s => s.settings.currencyUnit)
  const fiatList = useSelector(s => s.lists?.fiatList)
  const basePrice = fiatList?.find(r => r.symbol === unit)?.rate || 1

  const coinsList = useSelector(s => s.lists?.marketList)



  useEffect(() => {
    getMarketList()
  }, [])

  useEffect(() => {
    if (coinsList.length > 0) {
      const channel = pusher.subscribe('allTicker@agg')

      channel.bind('market:ticker:aggregate', (data) => {
        setUpdatedCoin(prepareIncomingCoinList(data))
      })
    }
  }, [coinsList])



  return (
    <>
      <div className='table-container'>
        <table>
          {coinsList?.length > 0 && <thead>
            <tr className="table100-head">
              {
                TABLE_HEADS.map((item, i) => (
                  <th className={item.classes || ''} key={i}>{item[lang]}</th>
                )).reverse()
              }
            </tr>
          </thead>}
          <tbody>
            {coinsData(combineObjectInArray([...updatedCoin, ...coinsList]), unit).map(coin => {
              const unt = coin.symbol.split('/')[0]
              const change = calcChages(coin.o, coin.c, unit)
              const cs = toEnglishNumber(change) >= 0.0
              return (
                <tr key={coin.symbol}>
                  <td>
                    <button className='success-btn'>
                      {lang === 'Fa' ? 'خرید/فروش' : 'buy/sell'}
                    </button>
                  </td>
                  <td>
                    <img className='chart' src={`https://mrbitex.net/v1/general/trade/market/mini-kline/${unt}`} alt={unt} />
                  </td>
                  <td className={`w-10w ${cs ? 'color-green' : 'color-red'}`}>{cs ? '+' : '-'}{change}%</td>
                  <td className='dir-ltr w-22w'>
                    <span className='c-value'>
                      <span>{CURRENCY_SYMS[unit][lang]}</span>
                  &nbsp;
                  <span>{clacValue(basePrice, (coin.c || coin.rate) * coin.relativeRate, unit)}</span>
                    </span>
                  </td>
                  <td>
                    <span className='wrapper'>
                      <span className='c-text'>
                        {unt}
                      </span>
                      <span className='c-text'>
                        {coinNames[unt][lang]}
                      </span>

                      <img className='c-logo' src={coin.base.logo} alt={coin.sym} />
                    </span>
                  </td>
                  <td className='c-1'>{coin.code}</td>
                </tr>
              )

            })}

          </tbody>
        </table>
      </div>

      <style jsx>
        {`
          .table-container {
            position: relative;
            z-index: 1000;
            bottom: 170px;
            width: 100%;
            direction: ${lang !== 'Fa' ? 'rtl' : 'ltr'};
            width: 97%;
            margin: 0 auto;
          }
          td span {
            height: 100%;
          }
          .wrapper {
            display: flex;
            justify-content: flex-end;
            align-items: center;
          }
          .c-text {
            margin: 0 9px;
          }
          .c-logo {
            width: 35px;
            margin: 0 3px;
          }
          .c-value {
            display: flex;
            justify-content: ${lang === 'Fa' ? 'flex-end' : 'flex-start'};
          }
          table {
            border-collapse: collapse;
            background: white;
            overflow: hidden;
            width: 100%;
            margin: 0 auto;
            position: relative;
            border: 1px solid #d2d2d2;
          }
          table * {
            position: relative;
          }
          table td, table th {
            vertical-align: middle;
            font-size: 1.2rem;
          }
          table td {
            color: ${darkGrayColor};
          }
          table thead tr {
            height: 45px;
            background: #f7f7f7;
            border-bottom: 1px solid #e0e0e0;
          }
          table tbody tr {
            height: 60px;
            border-bottom: 1px solid #e8e8e8;
          }
          table tbody tr:last-child {
            border: 0;
          }
          table td, table th {
            text-align: ${lang === 'Fa' ? 'right' : 'left'};
          }
          .table100-head th{
            font-size: 18px;
            color: ${darkColor};
            line-height: 1.2;
            font-weight: unset;
          }
          tbody tr {
            font-size: 15px;
            color: #808080;
            line-height: 1.2;
            font-weight: unset;
          }
          tbody tr:hover {
            color: #555555;
            background-color: #f5f5f5;
            cursor: pointer;
          }
          .t-1 {
            width: 100px;
            padding: 0 25px;
          }
          .t-2 {
            padding: 0 10px;
          }
          .c-1 {
            padding: 0 25px;
          }
          .color-red {
            color: ${redColor} !important;
          }
          .color-green {
            color: ${successColor} !important;
          }
          .chart {
            object-fit: cover;
            width: 80px;
          }
          button.success-btn {
            z-index: 2000;
            cursor: pointer;
          }
          .w-10w {
            width: 10vw;
          }
          .w-22w {
            width: 22vw;
          }
        `}
      </style>
    </>
  )
}

export default CoinsTable
