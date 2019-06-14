const router = require('express').Router()
const Db = require('../models/tenant-model')

router.get('/', async (req, res) => {
<<<<<<< HEAD
	try {
		const tenant = await Db.find();
		res.status(200).json(tenant);
	} catch (error) {
		console.log(error);
		res.status(500).json(error.message);
	}
});
=======
  try {
    const tenant = await Db.find()
    res.status(200).json(tenant)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
})
>>>>>>> master

router.post('/', async (req, res) => {
  try {
    const tenant = await Db.add(req.body)
    res.status(201).json(tenant)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
})

router.put('/:id', (req, res) => {
<<<<<<< HEAD
	Db('tenant').where({ id: req.params.id }).update(req.body).then((count) => {
		if (count > 0) {
			res.status(200).json(count);
		} else {
			res.status(404).json({ message: 'tenant not found' });
		}
	});
});

router.delete('/:id', (req, res) => {
	Db('tenant')
		.where({ id: req.params.id })
		.del()
		.then((count) => {
			if (count > 0) {
				res.status(200).json(count);
			} else {
				res.status(404).json({ message: 'action not found' });
			}
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

module.exports = router;
=======
  Db('tenant')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json(count)
      } else {
        res.status(404).json({ message: 'tenant not found' })
      }
    })
})

router.delete('/:id', (req, res) => {
  Db('tenant')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json(count)
      } else {
        res.status(404).json({ message: 'action not found' })
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

module.exports = router
>>>>>>> master