import MainStyle from 'common/mainStyle/mainStyle'
import { Provider } from 'react-redux'
import { setPusherClient } from 'react-pusher'
import Pusher from 'pusher-js'
import { configureStore } from 'redux/configStore'

const store = configureStore()
export const dispatch = store.dispatch


 
const pusherClient = new Pusher(process.env.PUSHER_APP_KEY, {
  cluster: process.env.PUSHER_APP_CLUSTER,
  encrypted: true
})
 
setPusherClient(pusherClient)


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