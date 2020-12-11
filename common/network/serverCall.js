const { default: axios } = require('axios');


const CancelToken = axios.CancelToken;
let cancel;


async function serverCall({ method, url, bodyParams, headerParams, lang, cancelable = false, cb = () => { } }) {
  const headers = {
    'accept': 'application/json',
    ['Content-Type']: 'application/json',
    'accept-language': lang,
    'User-Agent': 'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36',
    ...headerParams,
  }


  // if cancel flag is set and cancel exist cancel request
  cancelable && cancel && cancel()

  try {
    const res = await axios({
      method: method,
      headers,
      data: bodyParams,
      url,
      // set cancel token
      cancelToken: new CancelToken(function (c) {
        if (cancelable) cancel = c;
        else cancel = undefined
      }),
    })

    cb(res.data.data)

  } catch (err) {
    // need err.request.readyState //4= resolve
    // need err.request.status // the status code 404,403,... // 0= network connection err


    // log error
    console.log('err', JSON.stringify(err))
    cb({ status: 200, message: 'failed', data: [] })
  }
}

module.exports = serverCall;