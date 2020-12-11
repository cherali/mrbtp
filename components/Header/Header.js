import { useState } from 'react'
import { lightGrayColor, primaryColor } from 'common/mainStyle/theme'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { objectToArray } from 'common/util/helpers'
import { changeAppLanguage, changeCurrencyUnit } from 'redux/actionCreators/settingsActionCreators'
import { getCurrencyUnit } from 'redux/actionCreators/listsActionCreators'


const LANGUAGES = {
  'Fa': { value: 'Fa', text: 'فارسی', showText: 'فا' },
  'En': { value: 'En', text: 'English', showText: 'en' }
}


const CURRENCY = {
  'IRT': { value: 'IRT', text: 'تومان' },
  'USD': { value: 'USD', text: 'دلار' },
  'TRY': { value: 'TRY', text: 'لیر' },
}



function Header() {
  const [show, setShow] = useState(false)

  const lang = useSelector(s => s.settings.language)
  const unit = useSelector(s => s.settings.currencyUnit)


  const handleChangeCurrency = value => () => {
    changeCurrencyUnit(value)
    getCurrencyUnit(value)
  }


  return (
    <>
      <header className='header justify-content-between aligin-items-center d-flex flex-row-reverse'>

        <div className='d-flex align-items-center flex-row-reverse'>
          <button className='btn-transparent h-100' onMouseEnter={() => setShow(true)} onMouseLeave={()=> setShow(false)}>
            {LANGUAGES[lang].showText}/{CURRENCY[unit].text}
          </button>


          <ul className='d-flex flex-row-reverse'>
            <li >
              <Link href="/" >
                <a className='primary-btn'>ثبت نام</a>
              </Link>
            </li>

            <li>
              <Link href="/">
                <a>ورود</a>
              </Link>
            </li>
          </ul>

        </div>

        <div className='d-flex align-items-center flex-row-reverse'>
          <Link href="/">
            <a>بازارها</a>
          </Link>

          <img className='logo' src={`https://mrbitex.com//images/logo/logo.svg`} alt='logo' />
        </div>


        {show && <div className='menus d-flex flex-row-reverse' onMouseLeave={() => setShow(false)} onMouseEnter={() => setShow(true)}>
          <div className='flex-column'>
            <span className='title'>واحد ارز</span>
            {
              objectToArray(CURRENCY).map(item => (
                <button onClick={handleChangeCurrency(item.value)} className={`btn-transparent menus-btn ${item.value == unit ? 'btn-active' : ''}`} key={item.value}>
                  {item.text}
                </button>
              ))
            }
          </div>

          <div className='flex-column'>
            <span className='title'>زبان</span>
            {
              objectToArray(LANGUAGES).map(item => (
                <button onClick={() => changeAppLanguage(item.value)} className={`btn-transparent menus-btn ${item.value == lang ? 'btn-active' : ''}`} key={item.value}>
                  {item.text}
                </button>
              ))
            }
          </div>
        </div>}

      </header>

      <style jsx>
        {`
          .header {
            position: relative;
            height: 60px;
            background-color: #12161c;
            width: 100%;
          }

          .menus {
            background-color: #202228;
            position: absolute;
            top:0;
            left: ${lang === 'Fa' ? 0 : 'auto' };
            right: ${lang === 'Fa' ? 'auto' : 0 };
            margin-top: 60px;
            z-index: 1500;
          }

          .menus .menus-btn:hover {
            background-color: #464648;
          }

          .menus button {
            padding: 7px 35px;
            font-size: 0.9rem;
          }

          .title {
            color: ${lightGrayColor};
            font-size: 0.8rem;
            text-align: center;
            margin: 12px 0 6px 0;
          }

          
          a {
            color: white;
          }

          a:hover {
            color: ${primaryColor};
          }

          .logo {
            width: 100px;
            margin: auto 0;
            margin: 0 20px
          }

        `}

      </style>
    </>
  )
}

export default Header
