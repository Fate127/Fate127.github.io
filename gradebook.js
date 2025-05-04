function fetchGradeData() {
	console.log("Fetching grade data...");
	// This function will fetch data in future assignments
	let xhr = new XMLHttpRequest();
	// This is the address on the machine we're asking for data
	let apiRoute = "/api/grades";
	// When the request changes status, we run this anonymus function
	xhr.onreadystatechange = function() {
		let results;
		// check if we're done
		if (xhr.readyState === xhr.DONE) {
			// Check if we're successful
			if (xhr.status !== 200) {
				consol.error('Could not get grades.Status: ${xhr.status}');
			}
			// And then call the function to update the HTML with our data
			populateGradebook(JSON.parse(xhr.responseText));
		}
	}.bind(this);
	xhr.open("get", apiRoute, true);
	xhr.send();
}

function populateGradebook(data) {
	// This function will dynamically add rows to the gradebook in future assignments
	console.log("Populating gradebook with data:", data);
	let tableElm = document.getElementById("gradebook"); // Get the gradebool table element
		data.forEach(function(assignment) { // For each row of data we're passed in
			let row = document.createElement("tr"); // create a table row element
			let colums = []; // Handy place to stick the columns of information
			columns.name = document.createElemnt('td'); // The first column's table data will be the name
			columns.name.appendChild(
				// Concatenate the full name: "last name, first name"
				document.createTextNode(assignment.last_name + ", " + assignment.first_name)
			);
			columns.grade = document.createElement('td'); // seccond column will be the grade
			columns.grade.appendChild(
				// Just put the name in text, you could be fancy and figure out the letter grade here
				// with either a bunch of conditions, or a JavaScript "switvh" statement
				document.createTextNode(assignment.total_grade)
			);
			// Add the table data columns to the table row
			row.appendChild(columns.name);
			row.appendChild(columns.grade);
			// Add the row to the table itself to make the data visible
			tableElm.appendChild(row);
		});
}

// Call the stubs to test
const gradeData = fetchGradeData();
populateGradebook(gradeData);
