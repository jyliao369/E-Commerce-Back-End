const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    // NOTE TO SELF: WHEN ADDING AN INLCUDE, MAKE SURE
    // IT IS INSERTED LIKE A PARAMETER
    const categoryData = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product}]
    });
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
    res.status(400).json(err);
  }
});

// update a category by its `id` value
// .update() is used update any data that uses the Category model
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update({
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id,
      },
    })

    if(!categoryData[0]) {
      res.status(404).json({ message: "No Category matches the ID" })
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
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
      res.status(404).json({ message: "No category found with the ID" });
      return;
    }

    res.status(200).json({ message: "Category removed" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
