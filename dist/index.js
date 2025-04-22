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
        <td class="deleteCol"><button class="deleteBtn" data-id="${exp.id}">✖</button></td>
    `;

    tableBody.appendChild(row);
    });

    document.querySelectorAll(".deleteBtn").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            const id = btn.dataset.id;
    
            if (confirm("Är du säker på att du vill ta bort detta jobb?")) {
                try {
                    const response = await fetch(`http://localhost:3000/api/workexp/${id}`, {
                        method: "DELETE",
                    });

                    const result = await response.json();

                    if (response.ok) {
                        alert("Jobbet har tagits bort!");
                        renderTable(experiences.filter(exp => exp.id != id)); // remove from view
                    }
                    else {
                        alert("Kunde inte ta bort jobbet.");
                        console.error(result.error);
                    }
                } 
                catch (err) {
                    alert("Nätverksfel vid borttagning.");
                    console.error(err);
                }
            }
        });
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
