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
        let cols = data.getNumberOfRows();
        
        for (let i = 0; i < cols; i++) {
            let event = JSON.parse(data.getValue(i, 2));
            events[event["nameOfEvent"]] = event;
        }
        
        let table = new google.visualization.Table(document.getElementById('table_div'));
        table.draw(data, {
            showRowNumber: true,
            width: '100%',
            height: '100%'
        });

        google.visualization.events.addListener(table, 'select', function () {
            let row = table.getSelection()[0].row;
            alert('You selected ' + data.getValue(row, 1));
        });
    }
};

loadEvents();
