let users = {};

let loadUsers = () => {
     google.charts.load('current', {
         packages: ['corechart', 'table']
     });

     // Set a callback to run when the Google Visualization API is loaded.
     google.charts.setOnLoadCallback(drawChart);

     function drawChart() {
       let query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/1L3BWW7stFlYas5xWW9hYDcXEImqOLKXyyU8H7OztyMw/edit#gid=0");
       query.send(handleQueryResponse);
     }

     function handleQueryResponse(response) {
         var data = response.getDataTable();
         console.log(data);
         //TODO: for each of these we add to events obj
         //On create new event add to event obj && push event to sheets
         let userData = data.hc;
         userData.forEach(function(user) {
             users[user["username"]] = user["userdata"]
         });
     }
};

loadUsers();