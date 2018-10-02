import should from 'should'
import sinon from 'sinon'

import * as json from '../../src/lib/json'

require('should-sinon')

export default () =>
  describe('json', () => {
    describe('stringify', () => {
      it('should be exported', () => {
        should.exist(json.stringify)
        json.stringify.should.be.a.Function()
      })

      it('should call JSON.stringify', () => {
        const spy = sinon.spy(JSON, 'stringify')
        const input = {key: 'test'}
        json.stringify(input)
        spy.callCount.should.equal(1)
        spy.firstCall.args[0].should.equal(input)
        spy.restore()
      })
    })

    describe('stringifyP', () => {
      it('should be exported', () => {
        should.exist(json.stringifyP)
        json.stringifyP.should.be.a.Function()
      })

      it('should stringify the data', done => {
        const input = {key: 'test'}
        const expected = '{"key":"test"}'
        json.stringifyP(input)
          .then(result => {
            result.should.equal(expected)
            done()
          })
          .catch(done)
      })
    })


    describe('parse', () => {
      it('should be exported', () => {
        should.exist(json.parse)
        json.parse.should.be.a.Function()
      })

      it('should call JSON.parse', () => {
        const spy = sinon.spy(JSON, 'parse')
        const input = '{"key": "test"}'
        json.parse(input)
        spy.callCount.should.equal(1)
        spy.firstCall.args[0].should.equal(input)
        spy.restore()
      })
    })

    describe('parseP', () => {
      it('should be exported', () => {
        should.exist(json.parseP)
        json.parseP.should.be.a.Function()
      })

      it('should stringify the data', done => {
        const expected = {key: 'test'}
        const input = '{"key":"test"}'
        json.parseP(input)
          .then(result => {
            result.should.eql(expected)
            done()
          })
          .catch(done)
      })
    })

    describe('export default', () => {
      it('should export stringify', () => {
        should.exist(json.default.stringify)
        json.stringify.should.equal(json.default.stringify)
      })

      it('should export stringifyP', () => {
        should.exist(json.default.stringifyP)
        json.stringifyP.should.equal(json.default.stringifyP)
      })

      it('should export parse', () => {
        should.exist(json.default.parse)
        json.parse.should.equal(json.default.parse)
      })

      it('should export parseP', () => {
        should.exist(json.default.parseP)
        json.parseP.should.equal(json.default.parseP)
      })
    })
  })
