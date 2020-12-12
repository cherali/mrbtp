import { garyColor } from 'common/mainStyle/theme'
import CoinsTable from 'components/CoinsTable/CoinsTable'


function Home() {
  return (
    <main>
      <section className='section-wrapper d-flex flex-column justify-content-center align-items-center'>

        <div className='text-container'>
          <h1>پیشرفته ترین سامانه معاملاتی آنلاین رمزارز کشور</h1>
          <h3>در مستربیتکس به آسانی بیت‌کوین و رمزارزهای دیگر را خرید و فروش و مدیریت کنید.</h3>
          <h3>برای شروع معامله و کسب درآمد ایمیل خود را وارد کنید.</h3>
        </div>

        <div className='register-container flex-row'>
          <input className='register-input' placeholder='ایمیل' />
          <button className='register-button primary-btn'>ثبت نام</button>
        </div>

      </section>

      <CoinsTable />


      <style jsx>
        {`
          .section-wrapper {
            background-color: #10101b;
            padding: 8rem 1rem 13rem 1rem;
            width: 100%;
          }
          .text-container {
            margin-top: -3rem;
            text-align: center;
          }
          .text-container h1 {
            color: white;
            font-size: 2.5rem;
            margin-bottom: 2.5rem;
            line-height: 3rem;
          }
          .text-container h3 {
            color: ${garyColor};
            font-size: 1rem;
            line-height: 2rem;
          }

          .register-container {
            height: 55px;
            display: flex;
            width: 45%;
            margin-top: 1.5rem;
          }
          .register-input {
            outline: none;
            border: none;
            padding: 10px 15px;
            border-radius: 3px;
            width: 100%;
            margin: 0 0.7rem;
          }
          .register-button {
            width: 38%;
          }
        `}
      </style>
    </main>
  )
}

export default Home
