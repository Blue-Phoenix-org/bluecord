## Handling commands with Blue Cord.

Handle commands with Blue Cord is very simple.

### Creating commands

#### Create a global command

```js
import Bluecord from "bluecord";

const token = "your discord bot token";
const options = {
    version: "v9";
}

const Handler = new Bluecord.Manager(token, options);

Handler.on("ready", () => {
    console.log("Command Handler ready!")
    const my_cool_command = {
        name: "ping",
        description: "A simple ping command"
    }
    Handler.registerCommand(my_cool_command);
})
```

#### Create a local command

```js
import Bluecord from "bluecord";

const token = "your discord bot token";
const options = {
    version: "v9";
}

const Handler = new Bluecord.Manager(token, options);

Handler.on("ready", () => {
    console.log("Command Handler ready!")

    const my_cool_guild = "your guild id"
    const my_cool_command = {
        name: "ping",
        description: "A simple ping command"
    }

    Handler.registerCommand(my_cool_command, my_cool_guild);
})
```

**The same logic can be used for `editCommand`, `deleteCommand` and `searchCommand`.**

### Searching commands

```js
import Bluecord from "bluecord";

const token = "your discord bot token";
const options = {
    version: "v9";
}

const Handler = new Bluecord.Manager(token, options);

Handler.on("ready", async () => {
    console.log("Command Handler ready!")
    const Commands_results = await Handler.searchCommand("ping");
    console.log("Commands found:", Commands_results);
})
```