import MainStyle from 'common/mainStyle/mainStyle'
import { Provider } from 'react-redux'
import { configureStore } from 'redux/configStore'

const store = configureStore()
export const dispatch = store.dispatch


function MyApp({ Component, pageProps }) {
  return (
    <>
      <MainStyle />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}


export default MyApp