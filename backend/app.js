const express = require("express");
const axios = require("axios");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Predict route
app.post("/predict", async (req, res) => {
  try {
    const inputData = req.body.input; // Expecting input as an array

    // Send the input data to the Python Flask API
    const response = await axios.post("http://127.0.0.1:5000/predict", {
      input: inputData,
    });

    // Send the prediction back to the client
    res.status(200).json({ prediction: response.data.prediction });
  } catch (err) {
    console.error("Error in prediction:", err);
    res.status(500).json({ error: "Failed to make prediction" });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
