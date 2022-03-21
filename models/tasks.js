const Task = require("./task");

class Tasks {
  _listing = {};

  get ArrListing() {
    const listing = [];
    Object.keys(this._listing).map((e) => {
      listing.push(this._listing[e]);
    });
    return listing;
  }
  constructor() {
    this._listing = {};
  }

  loadTasksFromArray(tasks = []) {
    tasks.map((t) => (this._listing[t.id] = t));
  }

  deleteTask(id = "") {
    if (this._listing[id]) {
      delete this._listing[id];
    }
  }

  createTask(desc = "") {
    const task = new Task(desc);
    this._listing[task.id] = task;
  }

  listCompleted() {
    let taskListed = "";
    console.log("\n");
    this.ArrListing.map((l, i) => {
      taskListed += `${`${i + 1}.`.green} ${l.desc} :: ${
        l.dateDone ? "Completed".green : "Pending".red
      }\n`;
    });
    console.log(taskListed);
  }

  listPendingOrCompleted(complete = true) {
    let index = 1;
    let taskListed = "";
    console.log("\n");
    this.ArrListing.map((l) => {
      if (complete && l.dateDone) {
        taskListed = `${`${index++}.`.green} ${l.desc} :: ${
          `${l.dateDone}`.green
        }`;
        console.log(taskListed);
      }
      if (!complete && l.dateDone === null) {
        taskListed = `${`${index++}.`.green} ${l.desc} :: ${"Pending".red}`;
        console.log(taskListed);
      }
    });
    console.log("\n");
  }

  toggleCompleted(ids = []) {
    ids.forEach((id) => {
      const task = this._listing[id];
      if (!task.dateDone) {
        task.dateDone = new Date().toISOString();
      }
    });
    this.ArrListing.forEach((t) => {
      if (!ids.includes(t.id)) {
        this._listing[t.id].dateDone = null;
      }
    });
  }
}

module.exports = Tasks;
