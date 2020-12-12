import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { lightGrayColor, primaryColor } from 'common/mainStyle/theme'
import { changeAppLanguage, changeCurrencyUnit } from 'redux/actionCreators/settingsActionCreators'
import { getFiatList, getLanguageList } from 'redux/actionCreators/listsActionCreators'


const LANGUAGES = {
  'Fa': { text: 'فارسی', showText: 'فا' },
  'En': { text: 'English', showText: 'en' }
}


const CURRENCY = {
  'IRT': 'تومان',
  'USD': 'دلار',
  'TRY': 'لیر',
}



function Header() {
  const [show, setShow] = useState(false)

  const fiat = useSelector(s => s.lists?.fiatList)
  const languages = useSelector(s => s.lists?.languageList)

  const lang = useSelector(s => s.settings.language)
  const unit = useSelector(s => s.settings.currencyUnit)


  const handleChangeCurrency = value => () => {
    changeCurrencyUnit(value.slice(0, 3))
  }

  useEffect(() => {
    getFiatList()
    getLanguageList()
  }, [])


  // use to set currency unit
  useEffect(() => {
    if(languages?.length > 0 ){
      // find current language object
      const currLang = languages.find(r => r.symbol === lang)
      changeCurrencyUnit(currLang.suggestCurrency)
    }
  }, [languages])


  return (
    <>
      <header className='header justify-content-between aligin-items-center d-flex flex-row-reverse'>

        <div className='d-flex align-items-center flex-row-reverse'>
          {fiat?.length > 0 && <button className='btn-transparent h-100' onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            {LANGUAGES[lang].showText}/{lang === 'Fa' ? CURRENCY[unit] : unit}
          </button>}


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

          <Link href="/">
            <a className='a-logo'>
              <img className='logo' src={`https://mrbitex.com//images/logo/logo.svg`} alt='logo' />
            </a>
          </Link>

        </div>


        {show && <div className='menus d-flex flex-row-reverse' onMouseLeave={() => setShow(false)} onMouseEnter={() => setShow(true)}>
          <div className='flex-column'>
            <span className='title'>واحد ارز</span>
            {
              fiat?.map(item => (
                <button onClick={handleChangeCurrency(item.symbol)} className={`btn-transparent menus-btn ${item.symbol == unit ? 'btn-active' : ''}`} key={item.symbol}>
                  { lang === 'Fa' ? CURRENCY[item.symbol] : item.name}
                </button>
              ))
            }
          </div>

          <div className='flex-column'>
            <span className='title'>زبان</span>
            {
              languages?.map(item => (
                <button onClick={() => changeAppLanguage(item.symbol)} className={`btn-transparent menus-btn ${item.symbol == lang ? 'btn-active' : ''}`} key={item.code}>
                  {LANGUAGES[item.symbol].text}
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
            left: ${lang === 'Fa' ? 0 : 'auto'};
            right: ${lang === 'Fa' ? 'auto' : 0};
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
            margin: 0 20px;
          }
          .a-logo {
            margin: 0;
            padding: 0 ;
          }

        `}

      </style>
    </>
  )
}

export default Header
