const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    // NOTE TO SELF: WHEN ADDING AN INLCUDE, MAKE SURE
    // IT IS INSERTED LIKE A PARAMETER
    const categoryData = await Category.findAll({
      include: [{ model: Product}]
    });
    // be sure to include its associated Products
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      
      // be sure to include its associated Products
      // Adding the inclusion of associated products
      include: [{ model: Product }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with the ID!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    // .create() allows data or objects to be created
    // normally used in .post route
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a category by its `id` value
// .update() is used update any data that uses the Category model
router.put('/:id', async (req, res) => {
  Category.update(
    // These are fields of the model that can be updated or changed
    {
      id: req.body.id,
      category_name: req.body.category_name,
    },
    // This gets the category based on the id given in the request params
    {
      where: {
        id: req.params.id,
      },
    }
  ).then((updatedCategory) => {
    res.json(updatedCategory);
  })
  .catch((err) => res.json(err));
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deletedCategory) {
      res.status(404).json({ message: 'No category found with the ID' });
      return;
    }

    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
