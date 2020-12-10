const { default: axios } = require('axios');


const CancelToken = axios.CancelToken;
let cancel;


async function serverCall({ method, url, bodyParams, headerParams, lang, cancelable = false, cb = () => { } }) {
  const headers = {
    'accept': 'application/json',
    ['Content-Type']: 'application/json',
    'accept-language': lang,
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

    await cb(res.data.data)
    return res.data.data

  } catch (err) {
    // need err.request.readyState //4= resolve
    // need err.request.status // the status code 404,403,... // 0= network connection err


    // log error
    console.log('err', JSON.stringify(err))
    return cb({ status: 200, message: 'failed', data: [] })
  }
}

module.exports = serverCall;