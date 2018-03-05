let taskList = [];

function addTask() {
  let task = document.forms["eventMaker"]["evDate"].value;
  let multiDayListDisplay = document.getElementById("multiDayList");
  let errorMessage = document.getElementById("errorMessage");
  console.log(task);
  if (task != "") {
    if (!taskList.includes(task)) {
      errorMessage.innerHTML = "";

      taskList.push(task);

      let newTask = document.createElement("a");
      newTask.setAttribute("href", "javascript:void(0);");

      newTask.setAttribute("id", "task" + task);
      newTask.setAttribute("name", "unassigned"); // Hidden attribute to test if the task has been assigned
      newTask.innerHTML = task;

      let button = document.createElement("button");
      button.setAttribute("style", "text-align: right");
      button.setAttribute("type", "button");
      button.setAttribute("onclick", "removeTask('" + task + "')");
      button.innerHTML = "<b>-</b>";
      newTask.append(button);
      multiDayListDisplay.appendChild(newTask);
    } else {
      errorMessage.innerHTML = "Error: Task already exists!";
    }
  } else {
    errorMessage.innerHTML = "Error: Please enter a task.";
  }
}

function chooseTask() {
  let task = document.activeElement;
  if (task.getAttribute("name") == "unassigned") {
    task.innerHTML += "<span style='color: darkgray;'><i><b> Assigned to Creator</b></i></span>";
    task.setAttribute("style", "background-color: lightgray");
    task.setAttribute("name", "assigned");
  } else {
    task.innerHTML = task.innerHTML.substring(0, task.innerHTML.indexOf("<span"));
    task.setAttribute("style", "");
    task.setAttribute("name", "unassigned");
  }
}

function removeTask(task) {
  console.log(task);
  let taskEntry = document.getElementById("task" + task);
  taskEntry.setAttribute("style", "background-color: darkgray");
  taskList.splice(taskList.indexOf(task), 1);
  taskEntry.parentNode.removeChild(taskEntry);
}

function addMultiEventBox() {
  // if ($('#multidayEvent').is(':checked')) {
  //   let multiBreak = $('<br id="multiBreak"/>');
  //   let multiLabel = $('<label id="multiLabel" for"evDate2">End Date</label>');
  //   let multiEvent = $('<input type="date" name="date" maxlength="10" required=true type=string id="evDate2">');
  //   $('#dates').append(multiBreak, multiLabel, multiEvent);
  // } else {
  //   $('#evDate2').remove();
  //   $('#multiLabel').remove();
  //   $('#multiBreak').remove();
  // }

  if ($('#multidayEvent').is(':checked')) {
    let multiButton = $('<button id="multiButton" type="button" onclick="addTask();">Add Date</button>');
     $('#multiDayList').append(multiButton);
     $('#eventDateLabel').text("Add Date");
  } else {
    $('#multiButton').remove();
    $('#eventDateLabel').text("Start Date");
    for (let i in taskList) {
      $('#task' + taskList[i]).remove();
    }
  }
}
