let events = [];
let currRowNum = 0;

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
        //row number in spreadsheet = i + row_offset (due to header and current id num)
        let row_offset = 2;
        let data = response.getDataTable();
        let rows = data.getNumberOfRows();

        for (let i = 0; i < rows; i++) {
            currRowNum = i + row_offset;
            let event = JSON.parse(data.getValue(i, 2));
            event["rowId"] = currRowNum;
            events.push(event);
        }
    }
};

loadEvents();

function addEventToEvents(eventObj) {
    currRowNum++;
    eventObj["rowId"] = currRowNum;
    events.push(eventObj);
}

function getEventsByDate(eventDate) {
    return events.filter(function (event) {
        if (event.dateOfEvent == eventDate) {
            return event;
        }
    });
}

function getEvent(eventName, eventDate) {
    return events.filter(function (event) {
        if (event.dateOfEvent == eventDate && event.nameOfEvent == eventName) {
            return event;
        }
    })[0];
}

function findEventsById(eventId) {
    return events.filter(function (event) {
        if (event.id == id) {
            return event;
        }
    });
}