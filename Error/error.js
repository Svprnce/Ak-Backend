class Errorhandler extends Error {
    constructor(msg, status, ...data) {
        super()
        this.msg = msg,
        this.statuscode = status
        this.info = data
    }
}

module.exports = Errorhandler