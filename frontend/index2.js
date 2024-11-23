document.getElementById('analyze-btn').addEventListener('click', function () {
    // Collect input values from the form
    const soilType = document.getElementById('soil-type').value;
    const pestControl = document.getElementById('pest-control').value;
    const irrigationType = document.getElementById('irrigation-type').value;
    const organicFertilizer = document.getElementById('organic-fertilizer').value;
    
    // Validate input fields
    if (!soilType || !pestControl || !irrigationType || !organicFertilizer) {
        
      alert("Please fill in all the fields before analyzing.");
      return;
    }
  
    // Create a payload to send to the API
    const agricultureData = {
      soilType: soilType,
      pestControl: pestControl,
      irrigationType: irrigationType,
      organicFertilizer: organicFertilizer,
    };
    
  
    // Make the API request to your existing backend
    fetch('https://your-backend-url.com/predict-agriculture', { // Replace with your actual API endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(agricultureData), // Send the agriculture data as JSON
    })
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        // Handle the API response
        if (data.success) {
          // Display the prediction received from the API
          document.getElementById('prediction').innerHTML = `
            <h3>Prediction:</h3>
            <p><strong>Soil Type:</strong> ${data.prediction.soilType}</p>
            <p><strong>Pest Control:</strong> ${data.prediction.pestControl}</p>
            <p><strong>Irrigation Type:</strong> ${data.prediction.irrigationType}</p>
            <p><strong>Organic Fertilizer Used:</strong> ${data.prediction.organicFertilizer}</p>
            <p><strong>Sustainability Status:</strong> ${data.prediction.sustainabilityStatus}</p>
          `;
        } else {
          // Handle case where API request was unsuccessful
          document.getElementById('prediction').innerText =
            'Error: Unable to get the prediction. Please try again later.';
        }
      })
      .catch((error) => {
        // Handle errors (e.g., network errors)
        console.error('Error:', error);
        document.getElementById('prediction').innerText =
          'Error: Network or API issue. Please try again later.';
      });
  });
  