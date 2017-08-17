import { init } from '../src'
const DB_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': 'Basic am9zZTphbGZhMTM0Ng==',
  'User-Agent': 'request'
}
const db = init('http://db.ceibo.co/rxjs_couchdb_test', DB_HEADERS)
// body.docs
describe("FIND", () => {
  it('works!', async () => {
    const body = await new Promise((resolve, reject) => {
      db.find({ _id: 'testOne' })
        .subscribe(({ response, body }) => {
          resolve(body)
        })
    })
    expect(body.docs[0].value).toEqual('amairu')
  })
})

// body
describe("GET", () => {
  it('works!', async () => {
    const body = await new Promise((resolve, reject) => {
      db.get('testOne')
        .subscribe(({ response, body }) => {
          resolve(body)
        })
    })
    expect(body.value).toEqual('amairu')
  })
})

describe("PUT", () => {
  it('works!', async () => {
    const body = await new Promise((resolve, reject) => {
      db.get('testOne')
        .flatMap(({ response, body }) => db.put(body))
        .subscribe(({ response, body }) => {
          resolve(body)
        })
    })
    expect(body.id).toEqual('testOne')
  })
})


describe("BULK", () => {
  it('works!', async () => {
    const body = await new Promise((resolve, reject) => {
      db.find({type: 'test'})
        .flatMap(({ response, body }) => db.bulk(body.docs))
        .subscribe(({ response, body }) => {
          resolve(body)
        })
    })
    body.map(doc => expect(doc.ok).toBeTruthy())
  })
})