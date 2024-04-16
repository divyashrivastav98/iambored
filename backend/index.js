import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const port = 4000;

const corsOptions = {
   origin:'*', 
   credentials:true,           
   optionSuccessStatus:200,
}

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://bored-api.appbrewery.com/random");
        res.send(response.data);
    } catch (error) {

    }
});

app.post("/submit", async (req, res) => {
    try {
        const type = req.body.type;
        const participants = req.body.participants;
        let url;
        if (type == 'random' && participants == 'random') {
            url = 'https://bored-api.appbrewery.com/random';
        } else if (type == 'random') {
            url = `https://bored-api.appbrewery.com/filter?participants=${participants}`;
        } else if (participants == 'random') {
            url = `https://bored-api.appbrewery.com/filter?type=${type}`;
        } else {
            url = `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`;
        }
        const response = await axios.get(url);
        res.send(response.data);
    } catch (error) {
        res.send({err: 'No activity found'});
    }
});

app.listen(port);