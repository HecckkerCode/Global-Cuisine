// Function to fetch festival data and update the webpage
function fetchAndDisplayFestivals() {
    // Define the URL of your dummy API (replace with your API URL)
    const apiUrl = 'data.json';

    // Make a GET request to the API using Axios
    axios.get(apiUrl)
        .then(function (response) {
            const festivals = response.data; // Retrieve festival data

            // Get the <ul> element where we'll add festival data
            const festivalList = document.getElementById('festival-list');

            // Loop through the festival data and create list items
            festivals.forEach(function (festival) {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<strong>${festival.name}</strong>: ${festival.description}`;
                festivalList.appendChild(listItem);
            });
        })
        .catch(function (error) {
            // Handle any errors
            console.error('Error:', error);
        });
}

// Call the function to fetch and display festivals when the page loads
document.addEventListener('DOMContentLoaded', function () {
    fetchAndDisplayFestivals();
});
