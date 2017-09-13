import should from 'should'
import * as base64Urlsafe from '../../src/lib/base64-urlsafe'


export default () =>
  describe('base64-urlsafe', () => {
    describe('encode', () => {
      it('should be exported', () => {
        should.exist(base64Urlsafe.encode)
        base64Urlsafe.encode.should.be.a.Function()
      })

      it('should replace + with -', () => {
        const {encode} = base64Urlsafe
        const input = Buffer.from('a+24+1452+xvxcvxvw==', 'base64')
        encode(input).should.equal('a-24-1452-xvxcvxvw')
      })

      it('should replace / with _', () => {
        const {encode} = base64Urlsafe
        const input = Buffer.from('a/24//1452/xvxcv//xv', 'base64')
        encode(input).should.equal('a_24__1452_xvxcv__xv')
      })

      it('should trim =', () => {
        const {encode} = base64Urlsafe
        const input = Buffer.from('1w==', 'base64')
        const input2 = Buffer.from('12w=', 'base64')
        encode(input).should.equal('1w')
        encode(input2).should.equal('12w')
      })

      it('should return the correct urlsafe representation', () => {
        const {encode} = base64Urlsafe
        const input = Buffer.from('12w3/++/+w==', 'base64')
        const input2 = Buffer.from('12++1s313/8=', 'base64')
        const input3 = Buffer.from('121s313ASHTg', 'base64')
        encode(input).should.equal('12w3_--_-w')
        encode(input2).should.equal('12--1s313_8')
        encode(input3).should.equal('121s313ASHTg')
      })
    })

    describe('encodeP', () => {
      it('should be exported', () => {
        should.exist(base64Urlsafe.encodeP)
        base64Urlsafe.encodeP.should.be.a.Function()
      })

      it('should return a Promise', () => {
        const {encodeP} = base64Urlsafe
        encodeP(Buffer.from('')).should.be.an.instanceOf(Promise)
      })

      it('should return the correct result', done => {
        const input = Buffer.from('12++1s313/8=', 'base64')
        base64Urlsafe.encodeP(input).then(result => {
          result.should.equal('12--1s313_8')
          done()
        })
        .catch(done)
      })
    })


    describe('decode', () => {
      it('should be exported', () => {
        should.exist(base64Urlsafe.decode)
        base64Urlsafe.decode.should.be.a.Function()
      })


      it('should replace - with +', () => {
        const {decode} = base64Urlsafe
        const input = 'a-24-145'
        const expected = Buffer.from('a+24+145', 'base64')
        expected.equals(decode(input)).should.be.True()
      })

      it('should replace _ with /', () => {
        const {decode} = base64Urlsafe
        const input = '_18_1342_____AA_'
        const expected = Buffer.from('/18/1342/////AA/', 'base64')
        expected.equals(decode(input)).should.be.True()
      })

      it('should add =', () => {
        const {decode} = base64Urlsafe
        const input = '14reag'
        const input2 = '31wasdc'
        const expected = Buffer.from('14reag==', 'base64')
        const expected2 = Buffer.from('31wasdc=', 'base64')
        expected.equals(decode(input)).should.be.True()
        expected2.equals(decode(input2)).should.be.True()
      })

      it('should return the correct base64 representation', () => {
        const {decode} = base64Urlsafe
        const input = '12w3_--_-w'
        const input2 = '12--1s313_8'
        const input3 = '121s313ASHTg'
        const expected = Buffer.from('12w3/++/+w==', 'base64')
        const expected2 = Buffer.from('12++1s313/8=', 'base64')
        const expected3 = Buffer.from('121s313ASHTg', 'base64')
        expected.equals(decode(input)).should.be.True()
        expected2.equals(decode(input2)).should.be.True()
        expected3.equals(decode(input3)).should.be.True()
      })
    })


    describe('decodeP', () => {
      it('should be exported', () => {
        should.exist(base64Urlsafe.decodeP)
        base64Urlsafe.decodeP.should.be.a.Function()
      })

      it('should return a Promise', () => {
        const {decodeP} = base64Urlsafe
        decodeP(Buffer.from('')).should.be.an.instanceOf(Promise)
      })

      it('should return the correct result', done => {
        const input = '12--1s313_8'
        const expected = Buffer.from('12++1s313/8=', 'base64')
        base64Urlsafe.decodeP(input).then(result => {
          expected.equals(result).should.be.True()
          done()
        })
        .catch(done)
      })
    })


    describe('export default', () => {
      it('should export encode', () => {
        should.exist(base64Urlsafe.default.encode)
        base64Urlsafe.encode.should.equal(base64Urlsafe.default.encode)
      })

      it('should export encodeP', () => {
        should.exist(base64Urlsafe.default.encodeP)
        base64Urlsafe.encodeP.should.equal(base64Urlsafe.default.encodeP)
      })


      it('should export decode', () => {
        should.exist(base64Urlsafe.default.decode)
        base64Urlsafe.decode.should.equal(base64Urlsafe.default.decode)
      })

      it('should export decodeP', () => {
        should.exist(base64Urlsafe.default.decodeP)
        base64Urlsafe.decodeP.should.equal(base64Urlsafe.default.decodeP)
      })
    })
  })
