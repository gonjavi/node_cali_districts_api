const express = require('express');
let app = express();
let District = require('../models/district');

app.get('/districts', (req, res) => {
  District.find({})
    .exec((err, districts) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        districts
      });
    });
});

app.get('/district/:id', (req, res) => {
  let id = req.params.id;

  District.findById(id)
    .exec((err, districtDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      if (!districtDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'The district does not exist - El barrio no existe'
          }
        });
      }

      res.json({
        ok: true,
        district: districtDB
      });
    });
});

app.post('/districts', (req, res) => {
  let body = req.body;

  const district = new District({
    name: body.name,
    comuna: body.comuna,
    description: body.description, 
  });

  district.save((err, districtDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!districtDB) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      district: districtDB,
    });
  });
});

app.put('/district/:id', (req, res) => {
  let id = req.params.id;
  let body = req.body;

  const district = {
    name: body.name,
    comuna: body.comuna,
    description: body.description,
  }

  District.findByIdAndUpdate(id, district, {new: true, runValidators: true,  useFindAndModify: false }, (err, districtDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!districtDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'The district does not exist'
        }
      });
    }

    res.json({
      ok: true,
      district: districtDB
    });
  });
});

app.delete('/district/:id', (req, res) => {
  let id = req.params.id;

  District.findByIdAndDelete(id, (err, districtDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!districtDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'The district does not exist - EL barrio no existe'
        }
      });
    }

    res.json({
      ok: true,
      message: 'The district was deleted'
    });
  });
});

module.exports = app;