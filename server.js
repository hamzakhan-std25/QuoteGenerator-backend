
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

// load .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const api_key = process.env.FAVQS_API_KEY || "YOUR_FAVQS_API_KEY"; // Replace with your actual API key

app.use(cors()); // allow all origins for dev





// ✅ Root route — health check
app.get("/", (req, res) => {
  res.send("🚀 Quotes API is live on Railway!");
});





// // Proxy for QOTD (no key required)
// app.get("/api/qotd", async (req, res) => {
//   try {
//     const response = await fetch("https://favqs.com/api/qotd");
//     const data = await response.json();
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch QOTD" });
//   }
// });



// Proxy for search/filter (needs API key)
app.get("/api/quotes", async (req, res) => {
  const { filter, type, page } = req.query;

  const url = new URL("https://favqs.com/api/quotes");
  if (filter) url.searchParams.append("filter", filter);
  if (type) url.searchParams.append("type", type);
  if (page) url.searchParams.append("page", page);

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Token token="${api_key}"` },
    });
    const data = await response.json();
    
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch quotes" });
  }
});







app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
