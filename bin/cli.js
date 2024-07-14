#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import figlet from "figlet";
import createProject from "../src/commands/create.js";

console.log(
  chalk.cyan(figlet.textSync("Blinker", { horizontalLayout: "full" }))
);

program
  .version("1.0.0")
  .description("Blinker CLI - Install templates for Solana Blinks projects");

program
  .command("create")
  .description("Create a new Solana Blinks project")
  .action(createProject);

// Custom help formatting
program.addHelpText(
  "before",
  `
${chalk.cyan("Welcome to Blinker!")}
A CLI tool for creating Solana Blinks projects with various templates.

${chalk.yellow("Usage:")}
  $ blinker [command] [options]
`
);

program.addHelpText(
  "after",
  `
${chalk.yellow("Examples:")}
  $ blinker create
  $ blinker --help
  $ blinker create --help

${chalk.cyan(
  "For more information, visit:"
)} https://github.com/Open-Sorcerer/blinker
`
);

// Override the default help option
program.helpOption("-h, --help", "Display help for command");

// Add a custom help command
program
  .command("help [command]")
  .description("Display help for a specific command")
  .action((commandName) => {
    if (commandName) {
      const command = program.commands.find(
        (cmd) => cmd.name() === commandName
      );
      if (command) {
        command.help();
      } else {
        console.log(chalk.red(`Unknown command: ${commandName}`));
        program.help();
      }
    } else {
      program.help();
    }
  });

program.parse(process.argv);

// Show help if no arguments provided
if (!process.argv.slice(2).length) {
  program.help();
}
