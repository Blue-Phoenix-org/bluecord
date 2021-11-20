# More advanced usage of blue cord

Blue cord have two classes, `Base_Manager` and `Manager`

Now, let's see the differecences between them.

## Base_Manager
The `Base_Manager` is the base class for bluecord, which is the class that you can extends to create your own manager.

The `Base_Manager` don't have any methods to modify commands, only have properties and two methods:

- `start()` - start the manager
- `stop()` - stop the manager

## Manager
The `Manager` is the class that extends the `Base_Manager` and have all the methods of blue cord (including start and stop, inherited from `Base_Manager`).
You can extends `Manager` too if you want to create your own manager, but wants to inherit methods from `Manager`

# Start and Stop the Manager
If you want to take more control of the manager, you can use the `start()` and `stop()` methods to start and stop the manager.

Now, let's go start the manager.
Note: The Manager automatically starts when you call them, but if you use the Base_Manager, you need to start it manually.

Now, let's go make an  script that stops the Manager after 5 seconds.
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
    // Setting a timeout to stop the manager after 5 seconds.
    setTimeout(() => {
        console.log("Stopping the manager...");
        commandHandler.stop();
    }, 5000);
});

// The event "stopped" fires when the manager is stopped.
commandHandler.on("stopped", () => {
    console.log("Manager stopped!");
});
```

# Making your own manager

You can make your own manager (without inherit `Manager` functions) by extending the `Base_Manager` class.
If you want to inherit `Manager` functions, you need to extends the `Manager` class.

An example of custom Manager:
```js
import Bluecord from "bluecord";

class My_Custom_Manager extends Bluecord.Base_Manager {
    constructor(token, options) {
        super(token, options);
    }

    // Make a method that returns the length of saved app commands.
    get_commands_length() {
        return this.app.commands.length;
    }

    // Make a function that do something and emit an event.
    do_something() {
        console.log("Doing something...");
        // your code to do something

        this.emit("something_done"); // This will emit an event "something_done", you can listen to it. :D
    }
}

const token = "your discord bot token";
const options = {
    version: "9"
}

const my_custom_manager = new My_Custom_Manager(token, options);

my_custom_manager.start(); // Base_Manager class don't start automatically, you need to start it manually, or make your own auto start :D

my_custom_manager.on("ready", () => {
    console.log("My custom manager is ready!");
    console.log(`Detected ${my_custom_manager.get_commands_length()} commands.`);
    my_custom_manager.do_something();
});

my_custom_manager.on("something_done", () => {
    // This event is emitted when the function "do_something" is called.
    // You can use events to make your own logic.
    console.log("Something done!");
});
```
Make your own manager is very easy and simple, you can use the same code as the example above to make your own manager and use your creativity.