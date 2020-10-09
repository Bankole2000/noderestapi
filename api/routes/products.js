const { Router } = require('express');

const router = Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET requests to /products',
  });
});

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'Handling POST requests to /products',
  });
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  if (id === 'special') {
    res.status(200).json({
      message: `You reached the secret - ${id} - id`,
    });
  } else {
    res.status(200).json({
      message: `Here's the details for product with id - ${id}`,
    });
  }
});

router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId;
  res.status(200).json({
    message: `Updated product with id ${id}`,
  });
});

router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
  res.status(200).json({
    message: `Deleted product with id ${id}`,
  });
});

module.exports = router;
