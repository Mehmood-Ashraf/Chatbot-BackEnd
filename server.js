import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const API_URL = "https://api.forefront.ai/v1/chat/completions";
const API_KEY = process.env.API_KEY;

app.get('/', (req, res) => {
    res.send("Server is running");
});

app.post('/chat', async (req, res) => {
    try {
        const response = await axios.post(API_URL, req.body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));