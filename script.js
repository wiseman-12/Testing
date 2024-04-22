let subjects = [];
let studentName = "Active";

function addSubject() {
    if (studentName === "Active") {
        studentName = document.getElementById("studentName").value;
        document.getElementById("studentName").disabled = true;
        document.getElementById("studentNameDisplay").textContent = studentName;
    }

    const subjectName = document.getElementById("subjectName").value;
    const subjectScore = parseInt(document.getElementById("subjectScore").value);

    if (subjectName && !isNaN(subjectScore)) {
        subjects.push({
            name: subjectName,
            score: subjectScore
        });
        displaySubjects();
        calculateAverage();
        calculateTotalScore();

    }

    document.getElementById("subjectName").value = "";
    document.getElementById("subjectScore").value = "";

    function calculateTotalScore() {
        const totalScore = subjects.reduce((acc, subject) => acc + subject.score, 0);
        document.getElementById("totalScore").textContent = totalScore;
    }

}

function handleStudentNameInput() {
    if (studentName === "Active") {
        document.getElementById("studentNameDisplay").textContent = "Active";
    }
}



function clearFields() {
    if (studentName === "Active") {

        document.getElementById("studentName").disabled = false;
        document.getElementById("studentNameDisplay").textContent = "Active";
        document.getElementById("totalScore").innerText = "Total Score: 0";
        subjects = [];

        displaySubjects();
        calculateAverage();
        calculateTotalScore();
        document.getElementById("subjectName").value = "";
        document.getElementById("subjectScore").value = "";


    } else {
        studentName === "Not Active"
        studentName = "Active";
        document.getElementById("studentName").disabled = false;
        document.getElementById("studentNameDisplay").textContent = studentName;
        document.getElementById("totalScore").innerText = "Total Score: 0";
        subjects = [];

        displaySubjects();
        calculateAverage();
        calculateTotalScore();
        document.getElementById("subjectName").value = "";
        document.getElementById("subjectScore").value = "";

    }

}




function displaySubjects() {
    const subjectList = document.getElementById("subjectList");
    subjectList.innerHTML = "";
    subjects.forEach((subject) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${subject.name}: ${subject.score}%`;
        subjectList.appendChild(listItem);
    });


}

function calculateAverage() {
    const averageScore = document.getElementById("averageScore");
    if (subjects.length > 0) {
        const totalScore = subjects.reduce((acc, subject) => acc + subject.score, 0);
        const average = totalScore / subjects.length;
        averageScore.textContent = ` ${average.toFixed(2)}%`;
    } else {
        averageScore.textContent = "0%";
    }

}

document.addEventListener("DOMContentLoaded", function() {
    let tableDisplayed = false;
    const tableDisplay = document.getElementById('tableDisplay');
    const clearButton = document.getElementById('clearButton');
    const passRateDisplay = document.getElementById('passRateDisplay'); // Added for displaying pass rate
    let studentCount = 0; // Initialize count to 0 for zero-based counting

    document.getElementById('updateButton').addEventListener('click', function() {
        const studentName = document.getElementById('studentNameDisplay').textContent.trim();
        const totalScore = parseFloat(document.getElementById('totalScore').textContent.trim());
        const averageScore = parseFloat(document.getElementById('averageScore').textContent.trim());
        const passOrFail = averageScore >= 50 ? 'Pass' : 'Fail';

        // Check if any of the fields are empty
        if (isNaN(totalScore) || isNaN(averageScore) || studentName === '') {
            return; // Do nothing if any of the fields are empty
        }

        if (!tableDisplayed) {
            createTable(studentName, totalScore, averageScore, passOrFail);
            tableDisplayed = true;
        } else {
            addRowToTable(studentName, totalScore, averageScore, passOrFail);
        }
    });

    function createTable(studentName, totalScore, averageScore, passOrFail) {
        const table = document.createElement('table');
        table.classList.add('results-table');

        const tableBody = document.createElement('tbody');
        const tableHeaders = ['Position', 'Student Name', 'Total Marks', 'Average Marks', 'Pass/Fail'];

        const headerRow = tableBody.insertRow();
        tableHeaders.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });

        const dataRow = tableBody.insertRow();
        const dataCells = [studentCount, studentName, totalScore, averageScore, passOrFail]; // Updated to start counting from 0
        dataCells.forEach(data => {
            const cell = dataRow.insertCell();
            cell.textContent = data;
        });

        table.appendChild(tableBody);
        tableDisplay.appendChild(table);

        sortTableByTotalScore();
        studentCount++;
        updatePassRate(); // Calculate and display pass rate when a new entry is added
    }

    function addRowToTable(studentName, totalScore, averageScore, passOrFail) {
        const table = tableDisplay.querySelector('table');
        const tableBody = table.querySelector('tbody');

        const newRow = tableBody.insertRow();
        const dataCells = [studentCount, studentName, totalScore, averageScore, passOrFail]; // Updated to start counting from 0
        dataCells.forEach(data => {
            const cell = newRow.insertCell();
            cell.textContent = data;
        });

        sortTableByTotalScore();
        studentCount++;
        updatePassRate(); // Calculate and display pass rate when a new entry is added
    }

    function sortTableByTotalScore() {
        const tableBody = document.querySelector('#tableDisplay table tbody');
        const rows = Array.from(tableBody.querySelectorAll('tr'));

        rows.sort((rowA, rowB) => {
            const scoreA = parseFloat(rowA.cells[2].textContent);
            const scoreB = parseFloat(rowB.cells[2].textContent);
            return scoreB - scoreA;
        });

        tableBody.innerHTML = '';
        rows.forEach((row, index) => {
            const positionCell = row.cells[0];
            const positionText = index === 0 ? '' : index;
            positionCell.textContent = positionText; // Update position without adding 1

            tableBody.appendChild(row);
        });
    }

    function calculatePassRate() {
        const tableBody = document.querySelector('#tableDisplay table tbody');
        const passCells = tableBody.querySelectorAll('td:nth-child(5)'); // Assuming Pass/Fail cells are in the 5th column

        let passCount = 0;
        passCells.forEach(cell => {
            if (cell.textContent === 'Pass') {
                passCount++;
            }
        });

        const totalStudents = passCells.length;
        const passRate = ((passCount / totalStudents) * 100).toFixed(2) + '%';

        return passRate;
    }

    function updatePassRate() {
        const passRate = calculatePassRate();
        passRateDisplay.textContent = `Pass Rate: ${passRate}`;
    }

    clearButton.addEventListener('click', function() {
        tableDisplayed = false;
        studentCount = 0; // Reset count to 0
        tableDisplay.innerHTML = '';
        passRateDisplay.textContent = ''; // Clear pass rate display when clearing the table
    });
});

document.getElementById('printButton').addEventListener('click', function() {
    const rows = document.querySelectorAll('#tableDisplay tbody tr'); // Get all rows from the table body

    const passRateDisplay = document.getElementById('passRateDisplay'); // Get the pass rate display element
    const passRate = passRateDisplay.textContent; // Get the pass rate value

    const newWindow = window.open();

    newWindow.document.write('<html><head><title>Wiseman Kamanga</title>');
    newWindow.document.write('<style>');
    newWindow.document.write('table { margin: auto; }'); // Center the table horizontally
    newWindow.document.write('</style>');
    newWindow.document.write('</head><body>');
    newWindow.document.write('<h1 style="text-align:center;">STUDENT RESULTS</h1>');

    // Add pass rate information to the printed document
    newWindow.document.write(`<p style="text-align:center;"> ${passRate}</p>`);

    newWindow.document.write('<table border="1">');
    newWindow.document.write('<thead><tr><th>Position</th><th>Student Name</th><th>Total Marks</th><th>Average Marks(%)</th><th>Pass/Fail</th></tr></thead>');
    newWindow.document.write('<tbody>');

    rows.forEach(row => {
        const cells = row.querySelectorAll('td'); // Get all cells in the row

        newWindow.document.write('<tr>'); // Start a new row in the new table
        cells.forEach(cell => {
            newWindow.document.write(`<td>${cell.textContent}</td>`); // Write cell content into the new table
        });
        newWindow.document.write('</tr>'); // Close the row in the new table
    });

    newWindow.document.write('</tbody>');
    newWindow.document.write('</table>');
    newWindow.document.write('</body></html>');

    newWindow.document.close(); // Close the document for writing
    newWindow.print(); // Print the content
    newWindow.close(); // Close the new window after printing
});