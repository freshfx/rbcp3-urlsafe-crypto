import asPromise from '../../src/lib/as-promise'


export default () =>
  describe('as-promise', () => {
    it('should return a Promise', () => {
      const doNothing = () => null
      asPromise(() => doNothing).should.be.an.instanceOf(Promise)
    })

    it('should throw if something fails', done => {
      const fail = () => {
        throw new Error('whoop')
      }
      asPromise(() => fail())
        .then(() => {
          throw new Error('shouldn\'t be reached')
        })
        .catch(error => {
          error.should.be.an.instanceOf(Error)
          error.message.should.equal('whoop')
          done()
        })
    })

    it('should resolve if everything works fine', done => {
      const resolves = () => 'result'

      asPromise(() => resolves())
        .then(result => {
          result.should.equal('result')
          done()
        })
        .catch(() => {
          throw new Error('shouldn\'t be reached')
        })
    })
  })
