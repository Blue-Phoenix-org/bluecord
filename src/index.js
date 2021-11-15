import pkg from "axios"
const { get, post, patch, put } = pkg
import eventemitter from "eventemitter3"

const API_URL = "https://discord.com/api"

class Base_Handler extends eventemitter {
    constructor(token, options) {
        super()
        this.token = token;
        this.options = options;
        this.api_url = API_URL + `/${this.options?.version || "v9"}`;
        this.app = null;
        console.log(this.api_url)
        
        Object.defineProperties(this, {
            'token': {
                enumerable: false
            }
        });
    }
    /**
     * Start the command handler.
     * @returns {Boolean} Returns true if the handler was started, otherwise returns an error.  
    */
     async start() {
        await get(`${this.api_url}/oauth2/applications/@me`, {
            headers: {
                Authorization: `Bot ${this.token}`
            }
        }).then(res => {
            this.app = res.data
        }).catch((e) => {
            throw new Error("Invalid token.")
        })
        this.emit("started")
        return true
    }
}

class Handler extends Base_Handler {
    constructor(token, options) {
        super(token, options)
    }
    
    /**
     * Get application commands.
     * @param {String} guild Guild id to get commands, if is undefined will get global commands.
     * @returns {Promise<Object>}
    */
    async getCommands(guild) {
        if(!this.app) {
            throw new Error("You must start the handler first.")
        }
        let url
        if(guild) {
            url = `${this.api_url}/applications/${this.app.id}/guilds/${guild}/commands`	
        } else {
            url = `${this.api_url}/applications/${this.app.id}/commands`
        }
        const res = await get(url, {
            headers: {
                Authorization: `Bot ${this.token}`
            }
        }).catch((err) => {
            throw new Error(err)
        })
        return res.data
    }
    /**
     * Register a new application command.
     * @param {Object} command The command object.
     * @param {String} guild The guild id to register the command, if is undefined will register global command.
     * @returns {Promise<Object>} The new command object. 
    */
    async registerCommand(command, guild) {
        if(!this.app) {
            throw new Error("You must start the handler first.")
        }
        if(typeof command !== "object") {
            throw new Error("Command must be an object.")
        }
        let url
        if(guild) {
            url = `${this.api_url}/applications/${this.app.id}/guilds/${guild}/commands`	
        } else {
            url = `${this.api_url}/applications/${this.app.id}/commands`
        }
        const res = await post(url, command, {
            headers: {
                Authorization: `Bot ${this.token}`
            }
        }).catch((err) => {
            throw new Error(err)
        })
        this.emit("command_registered", res.data)
        return res.data
    }

    /**
     * Edit a application command.
     * @param {String} commandID The ID of the command to edit.
     * @param {Object} command The new command object.
     * @param {String} guild the guild id to edit the command, if is undefined will edit global command.
     * @returns {Promise<Object>} The new command object.
    */
    async editCommand(commandID, command, guild) {
        if(!this.app) {
            throw new Error("You must start the handler first.")
        }
        if(!commandID) {
            throw new Error("Command ID is required.")
        }
        if(typeof command !== "object") {
            throw new Error("Command must be an object.")
        }
        let url
        if(guild) {
            url = `${this.api_url}/applications/${this.app.id}/guilds/${guild}/commands/${commandID}`	
        } else {
            url = `${this.api_url}/applications/${this.app.id}/commands/${commandID}`
        }
        const res = await patch(url, command, {
            headers: {
                Authorization: `Bot ${this.token}`
            }
        }).catch((err) => {
            throw new Error(err)
        })
        this.emit("command_edited", res.data)
        return res.data
    }
}

export default Handler
