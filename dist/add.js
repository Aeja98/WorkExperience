const API_URL = "https://workexperience-2c2q.onrender.com";

window.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#addExpForm");
    const message = document.querySelector("#message");
  
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        message.textContent = "";

        //get values from form inputs
        const companyname = document.querySelector("#companyname").value.trim();
        const jobtitle = document.querySelector("#jobtitle").value.trim();
        const location = document.querySelector("#location").value.trim();
        const startdate = document.querySelector("#startdate").value;
        const enddate = document.querySelector("#enddate").value;
        const description = document.querySelector("#description").value.trim();

        //make sure nothing is empty
        const validationErrors = validateForm({
            companyname,
            jobtitle,
            location,
            startdate,
            enddate,
            description
        });

        if (validationErrors.length > 0) {
            message.innerHTML = validationErrors.join("<br>");
            return;
        }

        //builds object
        const newExperience = {
            companyname,
            jobtitle,
            location,
            startdate,
            enddate,
            description
        };

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newExperience)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Kunde inte spara arbetserfarenheten.");
            }

            message.textContent = "Arbetserfarenheten har sparats.";
            form.reset();

            //send user back to list after saving
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        } catch (error) {
            console.error("POST error:", error);
            message.textContent = "Något gick fel när arbetserfarenheten skulle sparas.";
        }
    });
});

//validation stuff
function validateForm(data) {
    const errors = [];

    if (!data.companyname) {
        errors.push("Företagsnamn måste fyllas i.");
    }

    if (!data.jobtitle) {
        errors.push("Arbetsroll måste fyllas i.");
    }

    if (!data.location) {
        errors.push("Plats måste fyllas i.");
    }

    if (!data.startdate) {
        errors.push("Startdatum måste fyllas i.");
    }

    if (!data.enddate) {
        errors.push("Slutdatum måste fyllas i.");
    }

    if (!data.description) {
        errors.push("Beskrivning måste fyllas i.");
    }

    if (data.startdate && data.enddate && data.enddate < data.startdate) {
        errors.push("Slutdatum kan inte vara tidigare än startdatum.");
    }

    return errors;
}