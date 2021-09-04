const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.finalAll({
      include: [{ model: Product, model: ProductTag, model: Tag }]
    });
    res.status(200).json(tagData);
  } catch {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      
      // be sure to include its associated Product data
      include: [{ model: Product, through: ProductTag, as:'tagged_products' }]
    });

    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with the ID'});
      return;
    }

    res.status(200).json(tagData);
  } catch {
    res.status(500).json(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  // .create() allows data or objects to be created
  // normally used in .post route
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    if(!tagData[0]) {
      res.status(404).json({ message: 'Tag not found!' })
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    
    if (!deletedTag) {
      res.status(404).json({ message: "No Tag found with the ID" });
      return;
    }
    
    res.status(200).json({ message: 'Tag deleted' });
  } catch {
    res.status(500).json(err);
  }
});

module.exports = router;
