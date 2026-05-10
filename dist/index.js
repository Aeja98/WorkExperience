const API_URL = "https://workexperience-2c2q.onrender.com";

const tableBody = document.querySelector("#expTbl tbody");
const message = document.querySelector("#message");

//Fetch work experiences when page loads
getWorkExperiences();

async function getWorkExperiences() {
  try {
    message.textContent = "Laddar arbetserfarenheter...";

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Kunde inte hämta arbetserfarenheter.");
    }

    const experiences = await response.json();

    renderTable(experiences);
  } catch (error) {
    console.error("Failed to load work experiences:", error);
    message.textContent = "Kunde inte ladda arbetserfarenheterna. Försök igen senare.";
  }
}

//Render work experiences in table
function renderTable(experiences) {
  tableBody.innerHTML = "";

  if (experiences.length === 0) {
    message.textContent = "Det finns inga arbetserfarenheter att visa.";
    return;
  }

  message.textContent = "";

  experiences.forEach((exp) => {
    const row = document.createElement("tr");

    const companyCell = document.createElement("td");
    companyCell.textContent = exp.companyname;

    const titleCell = document.createElement("td");
    titleCell.textContent = exp.jobtitle;

    const locationCell = document.createElement("td");
    locationCell.textContent = exp.location;

    const startDateCell = document.createElement("td");
    startDateCell.textContent = formatDate(exp.startdate);

    const endDateCell = document.createElement("td");
    endDateCell.textContent = formatDate(exp.enddate);

    const descriptionCell = document.createElement("td");
    descriptionCell.textContent = exp.description;

    const deleteCell = document.createElement("td");
    deleteCell.classList.add("deleteCol");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "✖";
    deleteButton.classList.add("deleteBtn");
    deleteButton.addEventListener("click", () => deleteWorkExperience(exp.id));

    deleteCell.appendChild(deleteButton);

    row.appendChild(companyCell);
    row.appendChild(titleCell);
    row.appendChild(locationCell);
    row.appendChild(startDateCell);
    row.appendChild(endDateCell);
    row.appendChild(descriptionCell);
    row.appendChild(deleteCell);

    tableBody.appendChild(row);
  });
}

//Delete by id
async function deleteWorkExperience(id) {
  const confirmDelete = confirm("Är du säker på att du vill ta bort denna arbetserfarenhet?");

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Kunde inte ta bort arbetserfarenheten.");
    }

    message.textContent = "Arbetserfarenheten har tagits bort.";

    // Fetch updated data from the API after delete
    getWorkExperiences();
  } catch (error) {
    console.error("Delete error:", error);
    message.textContent = "Kunde inte ta bort arbetserfarenheten. Försök igen.";
  }
}

//Format dates format
function formatDate(isoDate) {
  if (!isoDate) {
    return "—";
  }

  return new Date(isoDate).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}