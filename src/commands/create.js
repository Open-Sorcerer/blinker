import chalk from "chalk";
import { exec } from "child_process";
import inquirer from "inquirer";
import ora from "ora";
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

  console.log(
    chalk.cyan("\nCreating Solana Blinks project:"),
    chalk.green(projectName)
  );

  const selectedTemplate = templates.find((t) => t.name === framework);

  if (selectedTemplate) {
    console.log(
      chalk.magentaBright(`\nUsing ${selectedTemplate.name} template`)
    );

    const spinner = ora("Cloning repository...").start();

    exec(
      `git clone ${selectedTemplate.repo} ${projectName} && cd ${projectName}`,
      (err, stdout, stderr) => {
        if (err) {
          spinner.fail(chalk.red("Project creation failed"));
          console.error(chalk.redBright(err));
          return;
        }

        spinner.succeed(chalk.green("Project created successfully"));

        console.log(chalk.dim("\nCommand output:"));
        console.log(chalk.dim(stdout));

        if (stderr) {
          console.log(chalk.yellow("\nWarnings:"));
          console.log(chalk.yellow(stderr));
        }

        console.log(chalk.cyan("\n✨ Next steps:"));
        console.log(chalk.white(`1. cd ${projectName}`));
        console.log(chalk.white("2. npm install"));
        console.log(chalk.white("3. npm run dev"));
      }
    );
  } else {
    console.log(chalk.redBright("Template not found"));
  }
}
