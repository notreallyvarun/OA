import express from "express";
import fetch from "node-fetch";
const app = express();
const port = 3000;

const API_URL = "http://35.200.185.69:8000/v1/autocomplete?query=";
const collectedNames = new Set();
const queue = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let requestCount = 0;
let namesPulledCount = 0;

console.log("Script is running...");

async function fetchNames(prefix, attempt = 1) {
    try {
        requestCount++;
        for (const prefix of prefix) {
            const response = await fetch(API_URL + prefix);
        if (response.status === 429) {
            let waitTime = Math.min(500 * attempt, 6000);
            console.warn(`Rate limited on: ${query}. Retrying in ${waitTime / 100}s...`);
            await delay(waitTime);
            return await fetchNames(prefixes, attempt + 1);
        }
        if (!response.ok) throw new Error(`HTTP Error! Status: ${response.status}`);

        const data = await response.json();
        if (data.results) {
            data.results.forEach(name => {
                if (!collectedNames.has(name)) {
                    collectedNames.add(name);
                    namesPulledCount++;
                    if (name.length > prefixes[0].length) {
                        queue.push(name);
                    }
                }
            });
        }
    }} catch (error) {
        console.error(`Error fetching ${prefixes}:`, error);
    }
}

async function discoverNames() {
    while (queue.length > 0) {
        const batch = queue.splice(0, 3);  
        console.log(`Fetching names for: ${batch}`);
        await fetchNames(batch);
        await delay(500);  
    }
    console.log("Extraction Complete! Found names:", collectedNames.size);
    console.log([...collectedNames]);
}

discoverNames();

app.get("/stats", (req, res) => {
    res.json({ requestCount, namesPulledCount, totalNames: collectedNames.size });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

