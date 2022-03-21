require("colors");
const {
  inquirerMenu,
  inquirerPause,
  inquirerRead,
  inquirerListTaksDeleted,
  inquirerConfirmation,
  inquirerListTaksCheck,
} = require("./helpers/inquirer");
const { saveDB, readDB } = require("./helpers/saveFile");
const Tasks = require("./models/tasks");

console.clear();

const main = async () => {
  let opt = "";
  const tasks = new Tasks();

  const tasksDB = readDB();
  if (tasksDB) {
    tasks.loadTasksFromArray(tasksDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await inquirerRead("DESCRIPTION ");
        tasks.createTask(desc);
        break;
      case "2":
        tasks.listCompleted();
        break;
      case "3":
        tasks.listPendingOrCompleted();
        break;
      case "4":
        tasks.listPendingOrCompleted(false);
        break;
      case "5":
        const ids = await inquirerListTaksCheck(tasks.ArrListing);
        tasks.toggleCompleted(ids);
        break;
      case "6":
        const id = await inquirerListTaksDeleted(tasks.ArrListing);
        if (id !== "0") {
          const ok = await inquirerConfirmation(" Are you sure?");
          if (ok) {
            tasks.deleteTask(id);
            console.log("\nTask deleted\n".yellow);
          }
        }
        break;

      default:
        break;
    }
    saveDB(tasks.ArrListing);
    await inquirerPause();
  } while (opt !== "0");
};

main();
