let dateList = [];

function addTask() {
  let date = document.forms["eventMaker"]["evDate"].value;
  let multiDayListDisplay = document.getElementById("multiDayList");
  let errorMessage = document.getElementById("errorMessage");

  if (date != "") {
    if (!dateList.includes(date)) {
      if (dateList.lenght != 0 && Date.parse(date) < Date.parse(dateList[0])) {
        errorMessage.innerHTML = "Error: Please enter date after start day.";
        return;
      }
      errorMessage.innerHTML = "";

      dateList.push(date);
      dateList.sort(function(a, b) {
        return Date.parse(a) - Date.parse(b);
      });

      let newDate = document.createElement("a");
      newDate.setAttribute("href", "javascript:void(0);");

      newDate.setAttribute("id", "date" + date);
      newDate.setAttribute("name", "unassigned"); // Hidden attribute to test if the date has been assigned
      newDate.innerHTML = date;

      let button = document.createElement("button");
      button.setAttribute("style", "text-align: right");
      button.setAttribute("type", "button");
      button.setAttribute("onclick", "removeDate('" + date + "')");
      button.innerHTML = "<b>-</b>";
      newDate.append(button);

      let nextNodeIndex = dateList.indexOf(date) + 1;
      if (nextNodeIndex == dateList.length) {
        multiDayListDisplay.appendChild(newDate);
      } else {
        let nextNode = document.getElementById('date' + dateList[nextNodeIndex]);
        multiDayListDisplay.insertBefore(newDate, nextNode);
      }

    } else {
      errorMessage.innerHTML = "Error: date already exists!";
    }
  } else {
    errorMessage.innerHTML = "Error: Please enter a date.";
  }
}

function chooseDate() {
  let date = document.activeElement;
  if (date.getAttribute("name") == "unassigned") {
    date.innerHTML += "<span style='color: darkgray;'><i><b> Assigned to Creator</b></i></span>";
    date.setAttribute("style", "background-color: lightgray");
    date.setAttribute("name", "assigned");
  } else {
    date.innerHTML = date.innerHTML.substring(0, date.innerHTML.indexOf("<span"));
    date.setAttribute("style", "");
    date.setAttribute("name", "unassigned");
  }
}

function removeDate(date) {
  let taskEntry = document.getElementById("date" + date);
  taskEntry.setAttribute("style", "background-color: darkgray");
  dateList.splice(dateList.indexOf(date), 1);
  taskEntry.parentNode.removeChild(taskEntry);
}

function addMultiEventBox() {
  if ($('#multidayEvent').is(':checked')) {
    $('#eventDateLabel').text("Add Date");
    $('#multiDayListDisplay').removeAttr('hidden');
  } else {
    $('#eventDateLabel').text("Start Date");
    for (let i in dateList) {
      $('#date' + dateList[i]).remove();
    }

    $('#multiDayListDisplay').prop('hidden', 'hidden');
  }
}

function addMultiEvent() {
  let dates = $('#multiDayList').children();
  let datesList = [];
  let validDates = true;

  dates.each(function() {
    datesList.push($(this).attr("id").replace('date', ''));
  });

  for (let i in datesList) {
    if (!checkDate(datesList[i])) {
      $('#date' + datesList[i]).css('background-color', '#d51010');
      validDates = false;
    }
  }

  if (!validDates)
    return validDates;

  let eventId = new Date().getTime();

  for (let i in datesList) {
    addSingleEvent(datesList[i], eventId);
  }
}
