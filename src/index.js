import EventEmitter from "events"
import IO from "socket.io-client"

const WSURL = "wss://gateway.discord.gg/?v=9&encoding=json"
const API_URL = `https//discord.com/api/`
const DEFAULT_API_VERSION = "v9"

class BaseClient extends EventEmitter {
    constructor(token, options, behavior) {
        super()
        if(!token) throw new Error("Please provide a token.")
        if(!behavior) behavior = {};
        if(!options) options = {};
        this.token = token
        this._options = options
        this._api_url = API_URL + behavior.api_version || DEFAULT_API_VERSION
    }
}

class Client extends BaseClient {
    constructor(token, options, behavior) {
        super(token, options, behavior)
    }

}

export default Client