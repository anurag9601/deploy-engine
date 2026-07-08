import express from "express";

const MANAGEMENT_APP = express();

const PORT = process.env.PORT || 8080;

MANAGEMENT_APP.listen(PORT, () => {
    console.log(`Management server is running on port ${PORT}`);
});