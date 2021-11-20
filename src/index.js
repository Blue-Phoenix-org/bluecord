import pkg from "axios"
import EventEmitter from "eventemitter3";
import separateCommand from "./utils/separateCommand.js"
const { get, post, patch, put, delete: Delete } = pkg
const API_URL = "https://discord.com/api"

/**
 * Represents the base of the command manager.
 * @extends EventEmitter
 * @property {String} token The bot's token.
 * @property {Object} options The options for the command manager.
*/
class Base_Manager extends EventEmitter {
    constructor(token, options) {
        super()
        /**
         * The bot's token.
         * @name Base_Manager#token
         * @type {String}
        */
        this.token = token;

        /**
         * The options for the command manager.
         * @name Base_Manager#options
         * @type {Object}
        */
        this.options = options;

        /**
         * The discord API url.
         * @name Base_Manager#api_url
         * @type {String}
         * @default "https://discord.com/api/v9"
        */
        this.api_url = API_URL + `/${this.options?.version || "v9"}`;

        /**
         * The bot's application.
         * @name Base_Manager#app
         * @type {Object}
        */
        this.app = null;

        /**
         * The utils functions used by the command manager.
         * @name Base_Manager#utils
         * @type {Object}
         * @property {Function} separateCommand Checks the command and separate the commands and groups of commands.
        */
        this.utils = {
            separateCommand
        }
    }

    /**
     * Start the command manager.
     * @returns {Boolean} Returns true if the manager was started, otherwise returns an error.  
    */
     async start() {
        if(this.app) {
            throw new Error("The manager is already started.")
        }
        this.app = "starting"
        await get(`${this.api_url}/oauth2/applications/@me`, {
            headers: {
                Authorization: `Bot ${this.token}`
            }
        }).then(async res => {
            this.app = res.data
            this.app.commands = await this.getCommands()
        }).catch((e) => {
            this.app = null
            throw new Error("Invalid token.")
        })
        this.emit("ready")
        return true
    }

    /**
     * Stop the command manager.
     * @returns {Boolean} Returns true to indicate that the manager is stopped.
    */
    stop() {
        this.app = null
        this.emit("stopped")
        return true
    }

    /**
     * Get application commands.
     * @param {String} [guild] Guild id to get commands, if is undefined will get global commands.
     * @returns {Promise<Object>}
    */
     async getCommands(guild) {
        if(!this.app) {
            throw new Error("The manager needs to be started, please call the start() function.")
        }
        if(this.app == "starting") {
            throw new Error("The manager is starting, please wait a moment.")
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
}

/**
 * Represents the command manager.
 * @extends Base_Manager
 * @property {Object} token The bot's token.
 * @property {Object} options The options for the command manager.
 * 
*/
class Manager extends Base_Manager {
    constructor(token, options) {
        super(token, options)
        this.start()
    }

    /**
     * Register a new application command.
     * @param {Object} command The command object.
     * @param {String} [guild] The guild id to register the command, if is undefined will register global command.
     * @returns {Promise<Object>} The new command object. 
    */
    async registerCommand(command, guild) {
        if(!this.app) {
            throw new Error("The manager needs to be started, please call the start() function.")
        }
        if(this.app == "starting") {
            throw new Error("The manager is starting, please wait a moment.")
        }
        if(typeof command !== "object") {
            throw new Error("Command must be an object.")
        }
        if(guild && typeof guild !== "string") {
            throw new Error("Guild ID must be a string.")
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
        this.app.commands.push(res.data)
        return res.data
    }

    /**
     * Edit a application command.
     * @param {String} commandID The ID of the command to edit.
     * @param {Object} command The new command object.
     * @param {String} [guild] the guild id to edit the command, if is undefined will edit global command.
     * @returns {Promise<Object>} The new command object.
    */
    async editCommand(commandID, command, guild) {
        if(!this.app) {
            throw new Error("The manager needs to be started, please call the start() function.")
        }
        if(this.app == "starting") {
            throw new Error("The manager is starting, please wait a moment.")
        }
        if(!commandID) {
            throw new Error("Command ID is required.")
        }
        if(typeof command !== "object") {
            throw new Error("Command must be an object.")
        }
        if(guild && typeof guild !== "string") {
            throw new Error("Guild ID must be a string.")
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
        const Acommand = this.app.commands.findIndex((command) => {
            return command.id == commandID
        })
        if(Acommand > -1) {
            this.app.commands[Acommand] = res.data
        }
        return res.data
    }

    /**
     * Delete a application command.
     * @param {String} commandID The ID of the command to delete.
     * @param {String} [guild] The guild id to delete the command, if is undefined will delete global command.
     * @returns {Promise<Object>} The deleted command object.
    */
    async deleteCommand(commandID, guild) {
        if(!this.app) {
            throw new Error("The manager needs to be started, please call the start() function.")
        }
        if(this.app == "starting") {
            throw new Error("The manager is starting, please wait a moment.")
        }
        if(!commandID) {
            throw new Error("Command ID is required.")
        }
        if(guild && typeof guild !== "string") {
            throw new Error("Guild ID must be a string.")
        }
        let url
        if(guild) {
            url = `${this.api_url}/applications/${this.app.id}/guilds/${guild}/commands/${commandID}`	
        } else {
            url = `${this.api_url}/applications/${this.app.id}/commands/${commandID}`
        }
        const res = await Delete(url, {
            headers: {
                Authorization: `Bot ${this.token}`
            }
        }).catch((err) => {
            throw new Error(err)
        })
        const command = this.app.commands.findIndex((command) => {
            return command.id == commandID
        })
        if(command > -1) delete this.app.commands[command];
        return res.data
    }

    /**
     * Search for a application command.
     * @param {String} commandName The name of the command to search.
     * @param {String} [guild] The guild id to search the command, if is undefined will search global command.
     * @returns {Promise<Array>} The commands matching the name.
    */
    async searchCommand(commandName, guild) {
        if(!this.app) {
            throw new Error("The manager needs to be started, please call the start() function.")
        }
        if(this.app == "starting") {
            throw new Error("The manager is starting, please wait a moment.")
        }
        if(!commandName) {
            throw new Error("Command name is required.")
        }
        if(typeof commandName !== "string") {
            throw new Error("Command name must be a string.")
        }
        if(guild && typeof guild !== "string") {
            throw new Error("Guild id must be a string.")
        }
        const cmds = await this.getCommands(guild)
        const filtered = cmds.filter(c => {
            return c.name.toLowerCase().includes(commandName.toLowerCase())
        })
        return filtered
    }
}

export default {
    Manager: Manager,
    Base_Manager: Base_Manager
}