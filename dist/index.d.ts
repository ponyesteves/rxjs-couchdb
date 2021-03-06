import * as Rx from 'rxjs'

interface IInit {
  find: (selector) => Rx.Observable<{response: any, body: any}>
  get: (selector) => Rx.Observable<{response: any, body: any}>
  put: (selector) => Rx.Observable<{response: any, body: any}>
  bulk: (selector) => Rx.Observable<{response: any, body: any}>
}

interface DB_HEADERS {
  'Content-Type': String
  'Authorization': String
  'User-Agent': String
}
interface interceptors {
  start?: () => any
  success?: () => any
  error?: () => any
}

export const init: (DBURI: String, headers: DB_HEADERS, interceptors?: interceptors) => IInit
