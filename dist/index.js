//Fetch my work experience api
fetch("http://localhost:3000/api/workexp")
    .then((res) => res.json())
    .then((data) => renderTable(data))
    .catch((err) => {
    console.error("Failed to load work experiences:", err);
});

//Loads info to table
function renderTable(experiences) {
    const tableBody = document.querySelector("#expTbl tbody");
    tableBody.innerHTML = ""; // Clear old data

    experiences.forEach((exp) => {
    const row = document.createElement("tr");

    //Order of the info
    row.innerHTML = `
        <td>${exp.companyname}</td>
        <td>${exp.jobtitle}</td>
        <td>${exp.location}</td>
        <td>${exp.startdate}</td>
        <td>${exp.enddate || "—"}</td>
    `;

    tableBody.appendChild(row);
    });
}