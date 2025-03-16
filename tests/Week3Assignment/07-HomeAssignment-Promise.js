/* //Create a function called fetchDataFromDatabase() that returns a Promise.
• Inside the function, use setTimeout() to simulate a delay of 3 seconds.
• Use a simple condition like const data = true to simulate whether data is available.
• If data is true, resolve the Promise with the message "Data fetched successfully!".
If data is false, reject the Promise with the message "Data not found!". */

function fetchDataFromDatabase() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = true;
            if (data) {
                resolve("Data fetched successfully!");
            } else {
                reject("Data not found!");
            }
        }, 3000);
    });
}

fetchDataFromDatabase()
    .then(message => {
        console.log(message); // "Data fetched successfully!"
    })
    .catch(error => {
        console.log(error); // "Data not found!"
    });