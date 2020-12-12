import { Provider } from 'react-redux'
import MainStyle from 'common/mainStyle/mainStyle'
import { configureStore } from 'redux/configStore'
import HTMLHeaders from 'components/Header/HTMLHeaders'
import Header from 'components/Header/Header'

const store = configureStore()
export const dispatch = store.dispatch


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <MainStyle />
        <HTMLHeaders />
        <Header />
        <Component {...pageProps} />
      </Provider>
    </>
  )
}


export default MyApp