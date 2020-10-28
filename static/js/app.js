// from data.js
var tableData = data;

// function to display UFO sightings
function tableDisplay(ufoSightings) {
    var tbody = d3.select("tbody");
    ufoSightings.forEach((ufoRecord) => {
        var row = tbody.append("tr");
        Object.defineProperties(ufoRecord).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.html(value);
        });
    });
};

// clear table for new data
function deleteTbody() {
    d3.select("tbody")
        .selectAll("tr").remove()
        .selectAll("td").remove();
};

// intial display of all UFO sightings
console.log(tableData);
tableDisplay(tableData);

// 'Filter Table' button
var button = d3.select("#filter-btn");

// filter database and display
button.on("click", function(event) {
    
    d3.event.preventDefault();
    deleteTbody();

    var filteredData = tableData;
    var inputID = document.getElementsByClassName("form-control");

    // iterate through all input fields
    for (var i = 0; i < inputID.length; i++) {

    var idName = inputID[i].id;
    var field = d3.select("#" + idName).property("value");
    
    // treat empty or space-only fields as a search for ALL for that field
    if (field.trim() !=="") {
        var filteredData = filteredData.filter(ufoSighting =>
            // match as case insensitive
        ufoSighting[idName].toUpperCase().trim() ===
        field.toUpperCase().trim());
    };
    };

// display message if no records found
if (filteredData.length == 0) {
    d3.select("tbody")
      .append("tr")
      .append("td")
        .attr("colspan", 7)
        .html("<h4>No Records Found</h4>");
};

console.log(filteredData);
tableDisplay(filteredData);
});

