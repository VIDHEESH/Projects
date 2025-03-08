const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const BASE_URL = "https://www.iucnredlist.org";

app.get("/species/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the IUCN page for the species
    const response = await axios.get(`${BASE_URL}/species/${id}`);
    const htmlData = response.data;

    // Extract image URL using regex or DOM parsing
    const imageRegex = /<img[^>]+src="([^"]+)"[^>]*class="species-img"/;
    const match = htmlData.match(imageRegex);
    const imageUrl = match ? match[1] : null;

    res.json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch species data." });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
