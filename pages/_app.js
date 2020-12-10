import MainStyle from 'common/mainStyle/mainStyle'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <MainStyle />
      <Component {...pageProps} />
    </>
  )
}


export default MyApp