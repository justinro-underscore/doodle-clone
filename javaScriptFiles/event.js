let events = {};

let loadEvents = () => {
    google.charts.load('current', {
        packages: ['corechart', 'table', 'sankey']
    });

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        let query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/1f7v5k0XmaXdCAGkO9DGnv6uTzkAl_FjHHpg4jV9lTgI/edit#gid=0");
        query.send(handleQueryResponse);
    }

    function handleQueryResponse(response) {
        let data = response.getDataTable();
        let rows = data.getNumberOfRows();

        for (let i = 0; i < rows; i++) {
            let event = JSON.parse(data.getValue(i, 2));
            events[event["dateOfEvent"] + '/' + event["nameOfEvent"]] = event;
        }
    }
};

loadEvents();

function getEventsByDate(eventDate) {
    eventsOnDate = [];
    for (let i in events) {
        if (events[i].dateOfEvent == eventDate)
            eventsOnDate.push(events[i]);
    }
    return eventsOnDate;
}

// function getEventByName(eventName, eventDate) // TODO Change to id
// {
//   let eventsOnDate = getEventsByDate(eventDate);
//   for(let i in eventsOnDate)
//   {
//     if(eventsOnDate[i]["nameOfEvent"] == eventName)
//       return eventsOnDate[i];
//   }
//   return null;
// }

function getEventByName(eventName) // TODO GET RID OF THIS MONSTROSITY
{
  for (let i in events) {
      if (events[i].nameOfEvent == eventName)
          return events[i];
  }
  return null;
}
