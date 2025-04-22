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
    tableBody.innerHTML = "";

    experiences.forEach((exp) => {
    const row = document.createElement("tr");

    //Order of the info
    row.innerHTML = `
        <td>${exp.companyname}</td>
        <td>${exp.jobtitle}</td>
        <td>${exp.location}</td>
        <td>${formatDate(exp.startdate)}</td>
        <td>${formatDate(exp.enddate)}</td>
    `;

    tableBody.appendChild(row);
    });
}

//Function to format start & end dates & write in swedish
    //Day Month Year => tex. 26 april 1998
function formatDate(isoDate) {
    if (!isoDate) return "—";
    return new Date(isoDate).toLocaleDateString("sv-SE", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}