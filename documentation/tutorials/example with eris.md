# Basic command handler example with eris

Now, let's go see an simple example of how to use bluecord with eris (is the same way with discord.js and others wrappers).

In this example, we will use ES6, but don't have any problems if you use commonJS.

```js
import eris from "eris";
import Bluecord from "bluecord";

const token = "your discord bot token";
const options = {
    version: "9"
} // <-- this options will be passed to blue cord manager.

const bot = new eris(token)
const Handler = new Bluecord.Manager(token, options)

bot.on("ready", () => {
    console.log("Bot is connected to discord gateway!")
})

// your code here


// to avoid use of bluecord functions without they are started, it's recommended to use the following code:
Handler.on("ready", () => {
    console.log("Command handler is ready!")
    bot.connect()
})

// bluecord automatically start when you call the Manager constructor, but if you use the Base_Manager, you need to start it manually.
// if you try to use bluecord functions that need the app informations, you will get an error.
```