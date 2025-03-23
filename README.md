# Project: Optimized API Name Extraction

## Overview
This project extracts names from an autocomplete API using an efficient batching approach to reduce the number of API requests while maximizing data collection.

## Approach
1. **Batch Processing:** Fetch multiple prefixes in parallel to reduce sequential requests.
2. **Rate Limit Handling:** Implements exponential backoff when encountering 429 errors.
3. **Queue Optimization:** Ensures unique prefixes are queued to avoid redundant API calls.
4. **Logging & Statistics:** Tracks total requests made and names collected.

## How to Run the Script
1. Install dependencies:
   --npm install express node-fetch
  
2. Run the script:
   --node file.js
   
3. View statistics:
   - Visited `http://localhost:3000/stats` in browser for the statistics.
   - Logs display the number of API requests made and names collected.

## Challenges Faced & Solutions
- **High Number of API Requests:** Initially, the script made too many sequential requests. *Solution:* Introduced batch processing.
- **Rate Limiting Issues:** Encountered 429 errors frequently. *Solution:* Implemented exponential backoff to retry failed requests.
- **Duplicate Requests:** Names were repeatedly added to the queue. *Solution:* Ensured unique name entries before enqueueing.

## Results
- **Total API Requests:**  
- **Total Names Collected:**
  {both are shown in statics page} 

## Tools Used
- **Node.js & Express** for handling requests
- **node-fetch** for making API calls
- **JavaScript (ES6)** for queue and async handling

## Future Improvements
- **Caching Responses:** Store previous results to avoid duplicate queries.
- **Parallelizing Fetch Requests Further:** Use worker threads for scalability.
- **Handling API Rate Limits More Dynamically:** Adjusting delay based on real-time response patterns.

---

 

