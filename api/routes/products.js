const { Router } = require('express');

const router = Router();
const Product = require('../models/Product');
const db = require('../../config/database');

const capitalizeFLetters = (word) => {
  return word.replace(/^./, word[0].toUpperCase());
};

const handleErrors = (err) => {
  let errors = [];
  let errorsObject = {};

  if (err.errors != undefined) {
    errorsObject.hasErrors = true;
    if (err.errors.length > 0) {
      err.errors.forEach((error) => {
        let fieldName = capitalizeFLetters(error.path);
        let message =
          error.type == 'unique violation'
            ? `The email - ${error.value} - is already in use`
            : capitalizeFLetters(error.message);

        errors.push({
          fieldName,
          message,
        });
      });
      errorsObject.errors = errors;
    }
  } else {
    errorsObject.hasErrors = false;
    errorsObject.errors = [];
  }
  return errorsObject;
};

router.get('/', async (req, res, next) => {
  try {
    /**
     * Query Examples
     * findAll({attributes: ['column1','column2']})
     */
    const products = await Product.findAll();
    console.log(products);
    res.status(200).json({
      message: 'Handling GET requests to /products',
      products,
    });
  } catch (err) {
    let errors = handleErrors(err);
    res.status(400).json(errors);
    console.log(err);
  }
});

router.post('/', async (req, res, next) => {
  Product.sync({ alter: true });

  try {
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
    });
    res.status(201).json({
      message: 'Handling POST requests to /products',
      product,
    });
  } catch (err) {
    let errors = handleErrors(err);
    res.status(400).json(errors);
    console.log(err);
  }
});

router.get('/:productId', async (req, res, next) => {
  const id = req.params.productId;

  try {
    const product = await Product.findByPk(id);
    if (product) {
      res.status(200).json({
        message: `Retrieved Product with id - ${id}`,
        product,
      });
    } else {
      res.status(200).json({
        message: `Couldn't find product with id - ${id}`,
        product,
      });
    }
  } catch (err) {
    let errors = handleErrors(err);
    res.status(400).json(errors);
    console.log(err);
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
