import should from 'should'
require('should-sinon')
import origZlib from 'zlib'

import * as zlib from '../../src/lib/zlib'


export default () =>
  describe('zlib', () => {
    describe('deflate', () => {
      it('should be exported', () => {
        should.exist(zlib.deflate)
        zlib.deflate.should.be.a.Function()
      })

      it('should return a Promise', () => {
        zlib.deflate().should.be.an.instanceOf(Promise)
      })

      it('should deflate something', done => {
        const input = Buffer.from('Hello!')
        const expected = Buffer.from('eJzzSM3JyVcEAAeiAhY=', 'base64')
        zlib.deflate(input).then(result => {
          expected.equals(result).should.be.True()
          done()
        })
        .catch(done)
      })
    })

    describe('inflate', () => {
      it('should be exported', () => {
        should.exist(zlib.inflate)
        zlib.inflate.should.be.a.Function()
      })

      it('should return a Promise', () => {
        zlib.inflate().should.be.an.instanceOf(Promise)
      })

      it('should inflate something', done => {
        const expected = Buffer.from('Hello!')
        const input = Buffer.from('eJzzSM3JyVcEAAeiAhY=', 'base64')
        zlib.inflate(input).then(result => {
          expected.equals(result).should.be.True()
          done()
        })
        .catch(done)
      })
    })


    describe('export default', () => {
      it('should export inflate', () => {
        should.exist(zlib.default.inflate)
        zlib.inflate.should.equal(zlib.default.inflate)
      })

      it('should export deflate', () => {
        should.exist(zlib.default.deflate)
        zlib.deflate.should.equal(zlib.default.deflate)
      })

      it('should export inflateSync', () => {
        should.exist(zlib.default.inflateSync) // eslint-disable-line no-sync
        zlib.inflateSync.should.equal(zlib.default.inflateSync) // eslint-disable-line no-sync
        zlib.inflateSync.should.equal(origZlib.inflateSync) // eslint-disable-line no-sync
      })

      it('should export deflateSync', () => {
        should.exist(zlib.default.deflateSync) // eslint-disable-line no-sync
        zlib.deflateSync.should.equal(zlib.default.deflateSync) // eslint-disable-line no-sync
        zlib.deflateSync.should.equal(origZlib.deflateSync) // eslint-disable-line no-sync
      })
    })
  })
