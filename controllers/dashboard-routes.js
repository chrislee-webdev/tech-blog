const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', (req, res) => {
    const userid =  req.session.user_id
    User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: userid
      },
      include: [
        {
          model: Post,
          
        },
        {
          model: Comment,
         
          include: {
            model: Post,
            attributes: ['title']
          }
        }
      ]
    })
      .then(dbUserData => {
        
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        // res.json(dbUserData);
        // const user = dbUserData.map(post => post.get({ plain: true }));

        res.render("dashboard", dbUserData)
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;