require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
    res.status(200).json({ status: 'UP' });
});

app.use("/api", routes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
