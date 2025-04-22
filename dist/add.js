//waits for the DOM to load
window.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".addExp");
  
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        //get values from form inputs
        const companyname = document.getElementById("companyname").value.trim();
        const jobtitle = document.getElementById("jobtitle").value.trim();
        const location = document.getElementById("location").value.trim();
        const startdate = document.getElementById("startdate").value;
        const enddate = document.getElementById("enddate").value || null;

        //builds object
        const newExperience = {
            companyname,
            jobtitle,
            location,
            startdate,
            enddate,
        };
  
        try {
            const response = await fetch("http://localhost:3000/api/workexp", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(newExperience),
            });
  
            const result = await response.json();
            
            //alert for success or error
            if (response.ok) {
                alert("Jobbet har sparats!");
                form.reset();
            } else {
                alert("Fel: " + result.error);
                console.error("Server error:", result.error);
            }
        } catch (err) {
            alert("Något gick fel när vi kontaktade servern");
            console.error("Network error:", err);
        }
    });
});