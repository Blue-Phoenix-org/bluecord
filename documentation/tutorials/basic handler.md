## Basic command handler with blue cord.

In this example, we will use ES6, but don't have any problems if you use commonJS.

```js
import Bluecord from "bluecord";

const token = "your discord bot token";
const options = {
    version: "9"
}

// Create a new instance of blue cord.
const commandHandler = new Bluecord.Manager(token, options)

// Listening for ready event.
commandHandler.on("ready", () => {
    console.log("Command handler is ready!");
    console.log(`Detected ${commandHandler.app.commands.length} commands.`);

});
```
Note: When the "start" function is called, it took some time to get the app informations, this is the why handler have "ready" and "stopped" event, you can use them to know when the handler is ready and when it is stopped. to don't difficulty the usage of the handler.