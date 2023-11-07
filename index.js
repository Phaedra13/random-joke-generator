import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

let jokeData 

app.listen(port, () => {
console.log(`server is listening on port ${port}.`);
});

app.use(express.static('public'));

// Retrieves new joke from joke API,
// renders first part of joke,
// and stores the joke data
app.get("/", async (req, res) => {
    try {
        const result = await axios.get(`https://v2.jokeapi.dev/joke/any`);
        jokeData = result.data;
        console.log(jokeData)
        res.render("index.ejs", { joke: jokeData.setup});
    } catch (error) {
        res.render("index.ejs", {error: "Sorry, there was an issue with loading your joke."});
    }
    
});

// Posts second part to joke
app.post("/", (req, res) => {
    if (jokeData) {
        res.render("index.ejs", { joke: jokeData.delivery });
    } else {
        res.status(404).json({ error: "No joke data available." });
    }
});
