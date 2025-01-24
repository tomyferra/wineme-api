const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares');
const Wine = require('../models/wine');
const mongoose = require("mongoose");

// Api home page
router.get('/', authenticateToken, async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,OPTIONS');

  const wines = await Wine.find();
  console.log(wines);
  res.json(wines);
});

//Get single wine from DB
router.get('/:id', async (req,res) => {
  const winefiltered = await Wine.findById(req.params.id);
  res.json(winefiltered);
});

//Add new wines to the database
router.post('/', async (req,res) => {
  console.log(req.body);
  const { Name, Winery, Variety, Year, Totalqualifications, Avgqualifications,Score, Marinates, Image, Region, Description} = req.body;
  const wine = new Wine({ Name, Winery, Variety, Year, Totalqualifications, Avgqualifications, Score, Marinates, Image, Region, Description});
  await wine.save();
  res.json({Status: "Wine saved"});
});

//Update the wine's data
router.put('/:id', async (req,res)=>{
  const { Name, Winery, Variety, Year, Totalqualifications, Avgqualifications, Score, Marinates, Image, Region, Description} = req.body;
  const wine = { Name, Winery, Variety, Year, Totalqualifications, Avgqualifications, Score, Marinates, Image, Region, Description};
  await Wine.findByIdAndUpdate(req.params.id, wine);
  res.json({Status: 'Wine updated'});
});

//Delete the wine
router.delete('/:id', async (req,res)=>{
  await Wine.findByIdAndDelete(req.params.id);
  res.json({Status: 'Wine deleted'});
});

// Endpoint para ejecutar el script de Python
router.post("/recommend/:name", async(req, res) => {
  try {
    const name = req.params.name.trim(); // Eliminar espacios extra

    console.log("Buscando vino con nombre:", name);

    const wine = await Wine.findOne({ Name: name });

    if (!wine) {
      return res.status(404).json({ message: "Vino no encontrado" });
    }
    res.json(wine);
  } catch (err) {
    console.error("Error en la consulta:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
  //console.log("IDs en la base de datos:", wines.map(w => w._id.toString()));
  //const winefiltered = await Wine.findById(req.params.id );
  //console.log("winefiltered: ", winefiltered)
  // const wines = await Wine.find();
  //res.json(winefiltered);
  // res.json({"id": req.params.id});
  // const winefiltered = await Wine.findById(req.params.id);
  // res.json({"id": winefiltered});

  // if (!id) {
  //     return res.status(400).json({ error: "El ID es requerido" });
  // }

  // const pythonProcess = spawn("python3", ["Recommend.py", id]);

  // let result = "";
  // pythonProcess.stdout.on("data", (data) => {
  //     result += data.toString();
  // });
  // console.log("result: ", result)
  // pythonProcess.stderr.on("data", (data) => {
  //     console.error(`Error: ${data}`);
  // });

  // pythonProcess.on("close", (code) => {
  //     if (code === 0) {
  //         res.json({ similarWines: JSON.parse(result.trim()) });
  //     } else {
  //         res.status(500).json({ error: `Error ejecutando el script (code ${code})` });
  //     }
  // });
});


module.exports = router;