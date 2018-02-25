 let users = {};

 let loadUsers = () => {
   google.charts.load('current', {
       packages: ['corechart', 'table', 'sankey']
   });

   // Set a callback to run when the Google Visualization API is loaded.
   google.charts.setOnLoadCallback(drawChart);

   function drawChart() {
       let query = new google.visualization.Query("https://docs.google.com/spreadsheets/d/1L3BWW7stFlYas5xWW9hYDcXEImqOLKXyyU8H7OztyMw/edit#gid=0");
       query.send(handleQueryResponse);
   }

   function handleQueryResponse(response) {
       let data = response.getDataTable();
       let cols = data.getNumberOfRows();

       for (let i = 0; i < cols; i++) {
         let user = JSON.parse(data.getValue(i, 2));
         users[user["username"]] = user;
       }
   }
 };

 loadUsers();