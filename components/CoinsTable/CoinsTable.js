import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Pusher from 'pusher-js'
import coinNames from './coinName.json'
import { darkColor, darkGrayColor, redColor } from 'common/mainStyle/theme'
import { clacValue } from 'common/util/helpers'

const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
  cluster: process.env.PUSHER_APP_CLUSTER,
  encrypted: true
})

const channel = pusher.subscribe('coins-list')


const TABLE_HEADS = [
  { text: '#', classes: 't-1' },
  { text: 'نام', classes: 't-2' },
  { text: 'قیمت' },
  { text: 'تغییرات' },
  { text: 'نمودار' },
  { text: 'خرید/فروش' },
]

const CURRENCY_SYMS = {
  'IRT': 'تومان',
  'USD': '$',
  'TRY': '₺',
}

function CoinsTable() {
  const [coinsList, setCoinsList] = useState(null)

  useEffect(() => {
    channel.bind('coin-price', data => {
      setCoinsList(data)
    })

    pusher.connection.bind('connected', async () => {
      try {
        await axios.post('/coins-list', { lang: 'Fa' })
      } catch (error) {
        console.log(error)
      }
    })
    return () => {
      pusher.disconnect()
    }
  }, [])

  const lang = useSelector(s => s.settings.language)
  const unit = useSelector(s => s.settings.currencyUnit)
  const basePrice = useSelector(s => s.lists?.currUnit?.rate) || 1


  return (
    <>
      <div className='table-container'>
        <table>
          {coinsList?.length > 0 && <thead>
            <tr className="table100-head">
              {
                TABLE_HEADS.map((item, i) => (
                  <th className={item.classes || ''} key={i}>{item.text}</th>
                )).reverse()
              }
            </tr>
          </thead>}
          <tbody>
            {coinsList?.map((coin) => (
              <tr key={coin.code}>
                <td>
                  <button className='success-btn'>
                    خرید/فروش
                  </button>
                </td>
                <td>
                  <img className='chart' src={`https://mrbitex.net/v1/general/trade/market/mini-kline/${coin.symbol}`} alt={coin.symbol} />
                </td>
                <td className='color-red'>d%</td>
                <td className='dir-ltr'>
                  <span className='c-value'>
                    <span>{CURRENCY_SYMS[unit]}</span>
                &nbsp;
                <span>{clacValue(basePrice, coin.rate, unit)}</span>
                  </span>
                </td>
                <td>
                  <span className='wrapper'>
                    <span className='c-text'>
                      {coin.symbol}
                    </span>
                    <span className='c-text'>
                      {coinNames[coin.symbol][lang]}
                    </span>

                    <img className='c-logo' src={coin.logo} alt={coin.sym} />
                  </span>
                </td>
                <td className='c-1'>{coin.code}</td>
              </tr>
            ))}

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
            margin: 0 3px;
          }
          .c-logo {
            width: 35px;
            margin: 0 3px;
          }
          .c-value {
            display: flex;
            justify-content: flex-end;
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
          .chart {
            object-fit: cover;
            width: 80px;
          }

          button.success-btn {
            z-index: 2000;
            cursor: pointer;
          }
        `}
      </style>
    </>
  )
}

export default CoinsTable
