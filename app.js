require("colors");
// const { showMenu, pause } = require("./helpers/messages");
const { inquirerMenu, inquirerPause } = require("./helpers/inquirer");
console.clear();

const main = async () => {
  let opt = "";
  do {
    opt = await inquirerMenu();
    await inquirerPause();
  } while (opt !== "0");
};

main();
