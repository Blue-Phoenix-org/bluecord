# Blue Cord
&bull; Manage your slash commands by simple way with blue cord.

## About

Blue Cord is a very simple library that help you to manage your slash commands.

- Easy to use
- Compatible with every discord wrapper made with node.js

## Installation
Node 14.x or higher is required.
```bash
npm install bluecord
yarn add bluecord
```

## Example Usage

Start the command manager.
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

Learn how to use blue cord here: [Documentation](https://blue-phoenix-org.github.io/bluecord/documentation/website/)