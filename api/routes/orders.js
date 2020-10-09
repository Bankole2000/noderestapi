const { Router } = require('express');

const router = Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET requests to /orders',
  });
});

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'Handling POST requests to /orders',
  });
});

router.get('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  if (id === 'special') {
    res.status(200).json({
      message: `You reached the secret - ${id} - id`,
    });
  } else {
    res.status(200).json({
      message: `Here's the details for order with id - ${id}`,
    });
  }
});

router.patch('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  res.status(200).json({
    message: `Updated order with id ${id}`,
  });
});

router.delete('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  res.status(200).json({
    message: `Deleted order with id ${id}`,
  });
});

module.exports = router;
