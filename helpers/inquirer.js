const inquirer = require("inquirer");

const questionsMenu = [
  {
    type: "list",
    name: "option",
    message: "Select an option",
    choices: [
      { value: "1", name: "1.- Do task" },
      { value: "2", name: "2.- List tasks" },
      { value: "3", name: "3.- List done tasks" },
      { value: "4", name: "4.- List pending tasks" },
      { value: "5", name: "5.- Complete task" },
      { value: "6", name: "6.- Delete task" },
      { value: "0", name: "0.- Exit" },
    ],
  },
];

const questionPause = [
  {
    type: "input",
    message: `Press ${"ENTER".green} to continue`,
    name: "exit",
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("====================".green);
  console.log("  choose an option".green);
  console.log("====================\n".green);

  const opt = await inquirer.prompt(questionsMenu);
  return opt.option;
};

const inquirerPause = async () => {
  await inquirer.prompt(questionPause);
  console.log('\n');
};

module.exports = {
  inquirerMenu,
  inquirerPause,
};
