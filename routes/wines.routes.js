const express = require('express');
const router = express.Router();

const Wine = require('../models/wine');

// Api home page
router.get('/', async (req,res) => {
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

module.exports = router;