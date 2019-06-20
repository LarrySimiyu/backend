const express = require('express');
const router = express.Router();
router.use(express.json());
const {
  find,
  findById,
  add,
  deleteService,
  update
} = require('../models/service-model');

//============================Read Router
router.get('/', async (req, res) => {
  const data = await find('service');
  try {
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});
//============================Create Router
router.post('/', async (req, res) => {
  const body = req.body;

  try {
    const inserted = await add(body);
    return res.status(201).json(inserted);
  } catch (err) {
    console.error({ code: err.code, message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const service = await findById(id);
    return res.status(200).json(service);
  } catch (err) {
    console.error({ code: err.code, message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deleteService(id);
    return res.status(200).json(deleted);
  } catch (err) {
    console.error({ code: err.code, message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const updatedBody = req.body;
  const { id } = req.params;
  try {
    const updated = await update(id, updatedBody);
    return res.status(200).json(updated);
  } catch (err) {
    console.error({ code: err.code, message: err.message });
  }
});

module.exports = router;
