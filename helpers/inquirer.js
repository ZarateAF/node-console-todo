const inquirer = require("inquirer");

const inquirerMenu = async () => {
  const questionsMenu = [
    {
      type: "list",
      name: "option",
      message: "Select an option",
      choices: [
        { value: "1", name: `${"1.-".green} Do task` },
        { value: "2", name: `${"2.-".green} List tasks` },
        { value: "3", name: `${"3.-".green} List done tasks` },
        { value: "4", name: `${"4.-".green} List pending tasks` },
        { value: "5", name: `${"5.-".green} Complete task` },
        { value: "6", name: `${"6.-".green} Delete task` },
        { value: "0", name: `${"0.-".green} Exit` },
      ],
    },
  ];
  console.clear();
  console.log("====================".green);
  console.log("  choose an option".white);
  console.log("====================\n".green);

  const opt = await inquirer.prompt(questionsMenu);
  return opt.option;
};

const inquirerPause = async () => {
  const questionPause = [
    {
      type: "input",
      message: `Press ${"ENTER".green} to continue`,
      name: "exit",
    },
  ];
  await inquirer.prompt(questionPause);
  console.log("\n");
};

const inquirerRead = async (message) => {
  const questionRead = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Write a message";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(questionRead);
  return desc;
};

const inquirerListTaksDeleted = async (tasks = []) => {
  const choices = tasks.map((t, i) => {
    return {
      value: t.id,
      name: `${`${i + 1}.`.green} ${t.desc}`,
    };
  });
  choices.unshift({
    value: '0',
    name: `${`0`.green} Cancel`,
  })
  const questionDelete = [
    {
      type: "list",
      message: `Delete`,
      name: "id",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(questionDelete);
  return id;
};

const inquirerConfirmation = async (message) => {
  const questionConfirmation = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(questionConfirmation);
  return ok;
};


const inquirerListTaksCheck = async (tasks = []) => {
  const choices = tasks.map((t, i) => {
    return {
      value: t.id,
      name: `${`${i + 1}.`.green} ${t.desc}`,
      checked: t.dateDone ? true : false,
    };
  });
  const questionCheck = [
    {
      type: "checkbox",
      message: `Choice`,
      name: "ids",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(questionCheck);
  return ids;
};


module.exports = {
  inquirerMenu,
  inquirerPause,
  inquirerRead,
  inquirerListTaksDeleted,
  inquirerListTaksCheck,
  inquirerConfirmation,
};
