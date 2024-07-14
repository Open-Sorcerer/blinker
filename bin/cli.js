#!/usr/bin/env node

import { program } from "commander";
import createProject from "../src/commands/create.js";

program
  .version("1.0.0")
  .description("Blinker CLI - Install templates for Solana Blinks projects");

program
  .command("create")
  .description("Create a new Solana Blinks project")
  .action(createProject);

program.parse(process.argv);
