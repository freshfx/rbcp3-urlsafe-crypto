import crypto from 'crypto'

import should from 'should'

import * as crypt from '../../src/lib/crypt'

export default () =>
  describe('crypt', () => {
    const ENC_KEY = crypto.randomBytes(32)
    const exampleInput = '{"key":"value"}'
    let encryptedExample = null

    describe('encrypt', () => {
      it('should be exported', () => {
        should.exist(crypt.encrypt)
        crypt.encrypt.should.be.a.Function()
      })

      it('should throw if an invalid encKey is given', () => {
        const doIt = (b, k) => () => crypt.encrypt(b, k)
        doIt(Buffer.from([])).should.throw('The "key" argument must be one of type Buffer, TypedArray, DataView, string, or KeyObject. Received type undefined')
        doIt(Buffer.from([]), 'asdf').should.throw('Invalid key length')
      })

      it('should return a correct looking Buffer', () => {
        const input = Buffer.from(exampleInput)
        const result = crypt.encrypt(input, ENC_KEY).toString()
        encryptedExample = result
        const regexResult = (/^([0-9a-f]{32}):([0-9a-f]{32})$/).exec(result)
        if (!regexResult) {
          throw new Error(`invalid result? ${result}`)
        }
      })
    })

    describe('encryptP', () => {
      it('should be exported', () => {
        should.exist(crypt.encryptP)
        crypt.encryptP.should.be.a.Function()
      })

      it('should return a Promise', () => {
        crypt.encryptP(Buffer.from([]), crypto.randomBytes(32)).should.be.an.instanceOf(Promise)
      })

      it('should return a correct looking Buffer', done => {
        const input = Buffer.from(exampleInput)
        const encKey = crypto.randomBytes(32)
        crypt.encryptP(input, encKey).then(result => {
          result = result.toString()
          const regexResult = (/^([0-9a-f]{32}):([0-9a-f]{32})$/).exec(result)
          if (!regexResult) {
            throw new Error(`invalid result? ${result}`)
          }
          done()
        })
        .catch(done)
      })
    })

    describe('decrypt', () => {
      it('should be exported', () => {
        should.exist(crypt.decrypt)
        crypt.decrypt.should.be.a.Function()
      })

      it('should return the unencrypted result', () => {
        const result = crypt.decrypt(encryptedExample, ENC_KEY).toString()
        result.toString().should.equal(exampleInput)
      })
    })


    describe('decryptP', () => {
      it('should be exported', () => {
        should.exist(crypt.decryptP)
        crypt.decryptP.should.be.a.Function()
      })

      it('should return a Promise', () => {
        crypt.decryptP(encryptedExample, ENC_KEY).should.be.an.instanceOf(Promise)
      })

      it('should return the unencrypted result', done => {
        const input = encryptedExample
        crypt.decryptP(input, ENC_KEY).then(result => {
          result.toString().should.equal(exampleInput)
          done()
        })
        .catch(done)
      })
    })


    describe('export default', () => {
      it('should be a Function', () => {
        crypt.default.should.be.a.Function()
      })

      it('should throw if encKey is missing or invalid', () => {
        const doIt = key => () => crypt.default(key)
        doIt().should.throw('encryption key is missing')
        doIt({}).should.throw('a Buffer or String is required')
        doIt('asdf').should.throw('invalid encryption key length (is: 4 bytes, should be: 32 bytes)')
        doIt(crypto.randomBytes(32)).should.not.throw()
      })

      it('should return the crypto functions', () => { // eslint-disable-line max-statements
        const funcs = crypt.default(crypto.randomBytes(32))
        should.exist(funcs.decrypt)
        funcs.decrypt.should.be.a.Function()
        should.exist(funcs.decryptP)
        funcs.decryptP.should.be.a.Function()
        should.exist(funcs.encrypt)
        funcs.encrypt.should.be.a.Function()
        should.exist(funcs.encryptP)
        funcs.encryptP.should.be.a.Function()

        const doIt = () => () => funcs.encrypt(Buffer.from([]))
        doIt().should.not.throw()
      })
    })
  })
