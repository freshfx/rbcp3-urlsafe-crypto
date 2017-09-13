import {randomBytes} from 'crypto'

import deepFreeze from 'deep-freeze'
import should from 'should'

import * as urlsafeCrypto from '../src'

import asPromiseTests from './lib/as-promise'
import base64UrlsafeTests from './lib/base64-urlsafe'
import jsonTests from './lib/json'
import zlibTests from './lib/zlib'
import cryptTests from './lib/crypt'

asPromiseTests()
base64UrlsafeTests()
jsonTests()
zlibTests()
cryptTests()


describe('urlsafe-crypto', () => {
  const ENC_KEY = randomBytes(32)
  const inputObject = deepFreeze({an: 'object'})
  const inputString = 'this is a string'
  let encryptedObject = null
  let encryptedString = null

  describe('encrypt', () => {
    it('should be exported', () => {
      should.exist(urlsafeCrypto.encrypt)
      urlsafeCrypto.encrypt.should.be.a.Function()
    })

    it('should encrypt an object', () =>
      urlsafeCrypto.encrypt(inputObject, ENC_KEY).then(result => {
        encryptedObject = result
        result.should.be.a.String()
        result.length.should.be.above(20)
        const regex = /^[a-zA-Z0-9_-]+$/
        regex.test(result).should.be.True()
      })
    )

    it('should encrypt a string', () =>
      urlsafeCrypto.encrypt(inputString, ENC_KEY).then(result => {
        encryptedString = result
        result.should.be.a.String()
        result.length.should.be.above(20)
        const regex = /^[a-zA-Z0-9_-]+$/
        regex.test(result).should.be.True()
      })
    )
  })

  describe('encryptSync', () => {
    it('should be exported', () => {
      should.exist(urlsafeCrypto.encryptSync) // eslint-disable-line no-sync
      urlsafeCrypto.encryptSync.should.be.a.Function() // eslint-disable-line no-sync
    })

    it('should encrypt an object', () => {
      const result = urlsafeCrypto.encryptSync(inputObject, ENC_KEY) // eslint-disable-line no-sync
      result.should.be.a.String()
      result.length.should.be.above(20)
      const regex = /^[a-zA-Z0-9_-]+$/
      regex.test(result).should.be.True()
    })

    it('should encrypt a string', () => {
      const result = urlsafeCrypto.encryptSync(inputString, ENC_KEY) // eslint-disable-line no-sync
      result.should.be.a.String()
      result.length.should.be.above(20)
      const regex = /^[a-zA-Z0-9_-]+$/
      regex.test(result).should.be.True()
    })
  })


  describe('decrypt', () => {
    it('should be exported', () => {
      should.exist(urlsafeCrypto.encrypt)
      urlsafeCrypto.encrypt.should.be.a.Function()
    })

    it('should decrypt an object', () =>
      urlsafeCrypto.decrypt(encryptedObject, ENC_KEY).then(result => {
        result.should.eql(inputObject)
      })
    )

    it('should decrypt a string', () =>
      urlsafeCrypto.decrypt(encryptedString, ENC_KEY, true).then(result => {
        result.should.equal(inputString)
      })
    )
  })


  describe('decryptSync', () => {
    it('should be exported', () => {
      should.exist(urlsafeCrypto.decryptSync) // eslint-disable-line no-sync
      urlsafeCrypto.decryptSync.should.be.a.Function() // eslint-disable-line no-sync
    })

    it('should decrypt an object', () => {
      urlsafeCrypto.decryptSync(encryptedObject, ENC_KEY).should.eql(inputObject) // eslint-disable-line no-sync
    })

    it('should decrypt a string', () => {
      urlsafeCrypto.decryptSync(encryptedString, ENC_KEY, true).should.equal(inputString) // eslint-disable-line no-sync
    })
  })


  describe('export default', () => {
    it('should be a Function', () => {
      urlsafeCrypto.default.should.be.a.Function()
    })

    it('should throw if encKey is missing or invalid', () => {
      const doIt = key => () => urlsafeCrypto.default(key)
      doIt().should.throw('encryption key is missing')
      doIt({}).should.throw('a Buffer or String is required')
      doIt('asdf').should.throw('invalid encryption key length (is: 4 bytes, should be: 32 bytes)')
      doIt(randomBytes(32)).should.not.throw()
    })

    it('should return the crypto functions', () => { // eslint-disable-line max-statements
      const funcs = urlsafeCrypto.default(randomBytes(32))
      should.exist(funcs.decrypt)
      funcs.decrypt.should.be.a.Function()
      should.exist(funcs.decryptSync) // eslint-disable-line no-sync
      funcs.decryptSync.should.be.a.Function() // eslint-disable-line no-sync
      should.exist(funcs.encrypt)
      funcs.encrypt.should.be.a.Function()
      should.exist(funcs.encryptSync) // eslint-disable-line no-sync
      funcs.encryptSync.should.be.a.Function() // eslint-disable-line no-sync

      const doIt = () => () => funcs.encrypt(Buffer.from([]))
      doIt().should.not.throw()
    })

    it('should use isString if set', done => {
      const funcs = urlsafeCrypto.default(randomBytes(32), true)
      const input = 'whaaaaat'
      funcs
        .encrypt(input)
        .then(result => {
          result.should.not.equal(input)
          return Promise.resolve(result)
        })
        .then(funcs.decrypt)
        .then(result => {
          result.should.equal(input)
          const encryptedSync = funcs.encryptSync(input) // eslint-disable-line no-sync
          encryptedSync.should.not.equal(input)
          funcs.decryptSync(encryptedSync).should.equal(input) // eslint-disable-line no-sync
          done()
        })
        .catch(done)
    })

    it('should encrypt/decrypt objects', done => {
      const funcs = urlsafeCrypto.default(randomBytes(32))
      const input = {
        key: 'value',
        an: 'object',
        with: 'some',
        properties: 'or',
        a: {
          nested: 'one'
        }
      }
      funcs
        .encrypt(input)
        .then(result => {
          result.should.not.eql(input)
          return Promise.resolve(result)
        })
        .then(funcs.decrypt)
        .then(result => {
          result.should.eql(input)
          const encryptedSync = funcs.encryptSync(input) // eslint-disable-line no-sync
          encryptedSync.should.not.equal(input)
          funcs.decryptSync(encryptedSync).should.eql(input) // eslint-disable-line no-sync
          done()
        })
        .catch(done)
    })

    it('should encrypt/decrypt both', done => {
      const ENC_KEY = randomBytes(32)
      const funcs = urlsafeCrypto.default(ENC_KEY)
      const funcsString = urlsafeCrypto.default(ENC_KEY, true)
      const input = {key: 'value'}
      const inputString = 'testString'

      Promise.all([
        funcs.encrypt(input),
        funcs.encrypt(inputString),
        funcsString.encrypt(input),
        funcsString.encrypt(inputString)
      ])
      .then(([encryptedObject, encryptedString, encryptedObject2, encryptedString2]) =>
        Promise.all([
          funcs.decrypt(encryptedObject2),
          funcs.decrypt(encryptedString2, true),
          funcsString.decrypt(encryptedObject, false),
          funcsString.decrypt(encryptedString)
        ])
      )
      .then(([decryptedObject, decryptedString, decryptedObject2, decryptedString2]) => {
        decryptedObject.should.eql(decryptedObject2)
        decryptedObject.should.eql(input)
        decryptedString.should.equal(decryptedString2)
        decryptedString.should.equal(inputString)

        funcsString.decryptSync(funcs.encryptSync(input), false).should.eql(input) // eslint-disable-line no-sync
        funcsString.decryptSync(funcs.encryptSync(inputString)).should.equal(inputString) // eslint-disable-line no-sync
        funcs.decryptSync(funcsString.encryptSync(input)).should.eql(input) // eslint-disable-line no-sync
        funcs.decryptSync(funcsString.encryptSync(inputString), true).should.equal(inputString) // eslint-disable-line no-sync
        done()
      })
      .catch(done)
    })
  })
})
