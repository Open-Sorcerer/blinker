import chalk from "chalk";
import { exec } from "child_process";
import inquirer from "inquirer";
import { getTemplates } from "../templates.js";

export default async function createProject() {
  const templates = getTemplates();

  const frameworkQuestion = [
    {
      message: chalk.blue("Which framework do you want to use?"),
      name: "framework",
      type: "list",
      choices: templates.map((t) => t.name),
    },
  ];

  const { framework } = await inquirer.prompt(frameworkQuestion);

  const projectNameQuestion = [
    {
      message: chalk.yellow("Enter the project name:\t"),
      name: "projectName",
      type: "input",
    },
  ];

  const { projectName } = await inquirer.prompt(projectNameQuestion);

  console.log("Creating Solana Blinks project with", projectName);

  const selectedTemplate = templates.find((t) => t.name === framework);

  if (selectedTemplate) {
    console.log(chalk.magentaBright(selectedTemplate.name));
    exec(
      `git clone ${selectedTemplate.repo} ${projectName} && cd ${projectName}`,
      (err, stdout, stderr) => {
        if (err) {
          console.log(chalk.redBright(err));
          return;
        }
        console.log(chalk.greenBright(stdout));
        console.log(chalk.blueBright(stderr));
        console.log(
          chalk.green(`\nProject "${projectName}" created successfully!`)
        );
        console.log(chalk.yellow(`\nNext steps:`));
        console.log(`1. cd ${projectName}`);
        console.log(`2. npm install`);
        console.log(`3. npm run dev`);
      }
    );
  } else {
    console.log(chalk.redBright("Template not found"));
  }
}
