const onjectCastUtilsHelper = {};

onjectCastUtilsHelper.castAllTaskBoard = (taskList) => {
  let initalData = {
    tasks: {},
    columns: {
      "column-1": {
        id: "column-1",
        title: "Pending",
        taskIds: [],
      },
      "column-2": {
        id: "column-2",
        title: "Doing",
        taskIds: [],
      },
      "column-3": {
        id: "column-3",
        title: "Review",
        taskIds: [],
      },
      "column-4": {
        id: "column-4",
        title: "Done",
        taskIds: [],
      },
    },
    columnOrder: ["column-1", "column-2", "column-3", "column-4"],
  };
  
  if (taskList) {
    initalData.tasks = taskList.map((task, index) => ({
      [task._id]: {
        id: task._id,
        name: task.name,
        content: task.description,
        cover: task.cover,
      },
    }));
    taskList.forEach((task) => {
      switch (task.status) {
        case "pending":
          initalData.columns["column-1"].taskIds.push(task._id);
          break;
        case "doing":
          initalData.columns["column-2"].taskIds.push(task._id);
          break;
        case "review":
          initalData.columns["column-3"].taskIds.push(task._id);
          break;
        case "done":
          initalData.columns["column-4"].taskIds.push(task._id);
          break;
        
      }
    });
  }
  return initalData;
};
module.exports = onjectCastUtilsHelper;
