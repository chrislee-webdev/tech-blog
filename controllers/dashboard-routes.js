const router = require('express').Router();
const { User, Post, Comment } = require('../models');

router.get('/', (req, res) => {
    const userid =  req.session.user_id
    console.log(req.session.user_id,"DAShboard")
    Post.findAll({
      
      where: {
        user_id: userid
      }
    })
      .then(dbUserData => {
        
        if (!dbUserData) {
          console.log(dbUserData)
          res.status(404).json({ message: 'No user post found with this user id' });
          return;
        }
        // res.json(dbUserData);
      const posts= dbUserData.map(post => post.get({ plain: true }));
        console.log(posts,"GET-dashboard+++++",dbUserData)
        res.render("dashboard", {posts:posts,loggedIn:req.session.loggedIn})
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;