let Commander = use('Ivy/Commander'),
    color = require('colors'),
    Helper = use('Ivy/Helper');

Commander.register('help')
    .description('Display help message.')
    .execute(() => {
        let content = 'Available commands:\n';
        let commandsList = Commander.getCommandsList();
        for (let command in commandsList) {
            content += `  ${Helper.padEnd(command, 20, ' ').green}${commandsList[command].descriptionText}\n`;
        }
        return content;
    });