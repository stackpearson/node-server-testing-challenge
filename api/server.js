const express = require("express");

const Bikes = require('../bikes/bikesModel.js');

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/bikes", (req, res) => {
  Bikes.getAll()
    .then(bikes => {
      res.status(200).json(bikes);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post('/bikes', (req, res) => {
  const newBike = req.body;

  Bikes.insert(newBike)
    .then(bike => {
      res.status(201).json({new_bike: bike})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: err})
    })
})

server.delete('/bikes/:id', (req, res) => {
  let id = req.params.id;

  if (id) {
    Bikes.remove(id, req.body)
    .then(updates => {
      res.status(201).json({message: 'bike removed'})
    })
    .catch(err => {
      res.status(500).json({message: 'bike not removed'})
    })
  } else {
    res.status(404).json({message: 'missing id to be deleted'})
  }

  
})

module.exports = server;
