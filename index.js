const express = require("express");
const app = express();

const cors = require("cors");

// call database config //
const pool = require("./db");

// middleware //
app.use(cors());
app.use(express.json()); // req Body

// ---- Routes ---- //
// Create Table //

app.post("/produk", async(req, res) => {
    try {
        // -- cek log pada terminal -- //
        //console.log(req.body);

        const { nama } = req.body;
        const newProduk = await pool.query(
            "INSERT INTO produk (nama) VALUES($1) RETURNING *",
            [nama]
        );

        res.json(newProduk.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// Read All Table //

app.get("/produk", async(req, res) => {
    try {
        const allProduk = await pool.query("SELECT * FROM produk");
        res.json(allProduk.rows)
    } catch (err) {
        console.error(err.message)
    }
})

// Read By Id //

app.get("/produk/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const produk = await pool.query("SELECT * FROM produk WHERE produk_id = $1", [id]);

        res.json(produk.rows[0]);

    } catch (err) {
        console.error(err.message)
    }
})

// Update Table //

app.put("/produk/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nama } = req.body;
        const updateProduk = await pool.query("UPDATE produk SET nama = $1 WHERE  produk_id = $2",
        [nama, id]);

        res.json(" Produk update")
    } catch (err) {
        console.error(err.message)
    }
})

// Delete Table //

app.delete("/produk/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteProduk = await pool.query("DELETE FROM produk WHERE produk_id = $1",
        [id]);

        res.json("Produk telah dihapus!")
    } catch (err) {
        console.error(err.message)
    }
})

// Untuk menamoilkan log pada terminal //
app.listen(5000, () => {
    console.log("Server has start on port 5000");
});