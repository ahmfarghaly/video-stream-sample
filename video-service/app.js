const express = require('express');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const { generateUploadUrl } = require('./service'); // Import the JavaScript service


const PORT = process.env.PORT || 3030;

const app = express ();
app.use(express.json());

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Enable CORS for all origins (you can customize the options as needed)
app.use(cors());

app.get("/", (req, res) => {
    const status = {
       "Status": "Running"
    };
    
    res.send(status);
 });  


// REST API endpoint for generating pre-signed URLs
app.post('/generateUploadUrl', async (req, res) => {
    const { objectKey, contentType } = req.body;
  
    try {
      // Call the generateUploadUrl function from the service
      const uploadUrl = await generateUploadUrl(objectKey, contentType);
      res.json({ uploadUrl });
    } catch (error) {
      console.error('Error generating pre-signed URL:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});