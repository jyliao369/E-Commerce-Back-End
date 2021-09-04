const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.finalAll();
    res.status(200).json(tagData);
  } catch {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      
      // be sure to include its associated Product data
      include: [{ model: Product }]
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
router.post('/', (req, res) => {
  // .create() allows data or objects to be created
  // normally used in .post route
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      id: req.body.id,
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then((updatedTag) => {
    res.json(updatedTag);
  })
  .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    
    if (!deletedTag) {
      res.status(404).json({ message: "No Tag found with the ID" });
      return ;
    }
    
    res.status(200).json(deletedTag);
  } catch {
    res.status(500).json(err);
  }
});

module.exports = router;
