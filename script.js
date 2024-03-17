document.getElementById("absentForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this); // Create a FormData object from the form
    const name = formData.get("name"); // Get the value of the "name" field

    // Create an array with only the current date
    // const absentDate = [new Date().toISOString().slice(0, 10)]; // Get the current date in YYYY-MM-DD format


    // Get the current date
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0'); // Ensure two-digit day
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Ensure two-digit month (January is 0)
    const year = currentDate.getFullYear();

    // Construct the date string in "DD-MM-YYYY" format
    const formattedDate = [`${day}-${month}-${year}`];


    // Create a new object with the name and the array of absent dates
    const data = {
        name: name,
        //absent: absentDate // Send the array of absent dates
        absent: formattedDate // Send the array of absent dates
    };

    // Send a POST request to the server with the form data
    // if ur running it on localhost then use 
    // http://localhost:4000/submit
    // http://127.0.0.1:4000/submit
    fetch("http://localhost:4000/submit", { // Assuming your server is running locally at port 4000
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            return response.json();
        })
        .then(data => {
            console.log("Data submitted successfully:", data);
            alert("Data submitted successfully")
            window.open('http://localhost:4001/downloadAttendance', '_blank')
            location.reload(); // reload the apge after successful submission

        })
        .catch(error => {
            console.error("There was a problem submitting the data:", error);
            //alert("There was a problem submitting the data")
        });
});


