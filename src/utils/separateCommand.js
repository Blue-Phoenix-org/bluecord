
/**
 * Checks the command and separate the commands and groups of commands.
 * @param {Object} command The command object.
 * @returns {Object} The command object with separated commands and groups of commands.
*/
function separateCommand(command) {
    if(!command) {
        throw new Error('You need tho provide the command object.');
    }
    const options = command.options
    if(!options) {
        return {
            metrics: { 
                commands: 1,
                groups: 0,
                iterations: 0
             },
            commands: [command]
        }
    }
    let metrics = {}
    const subcommands = []
    const groups = []
    let index = 0
    let total_iterations = 0
    let sub = options.filter(option => option.type === 1 || option.type === 2)

    // now, lets separate the commands and groups of commands in this loop
    while(1 > 0) {
        const cmd = sub[index]
        if(!cmd) {
            metrics = {
                commands: subcommands.length,
                groups: groups.length,
                iterations: total_iterations
            }
            return {
                metrics: metrics,
                commands: subcommands,
                groups: groups
            }
        }
        if(cmd.type === 1) {
            // if is a command, only push it to the commands array and increase the index
            subcommands.push(cmd)
            index += 1
        } else if(cmd.type === 2) {
            // if is a group, push it to the groups array and sets the index to the first command of the group.
            // and change the value of sub to the commands of the group, to make iteration over the commands of the group.
            sub = cmd.options.filter(option => option.type === 1 || option.type === 2)
            groups.push(cmd)
            index = 0
        }
        //total iterations is only for metrics, you can know the total commands and groups viewing this.
        total_iterations += 1
    }
}

module.exports = separateCommand