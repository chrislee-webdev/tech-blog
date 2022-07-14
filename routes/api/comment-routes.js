const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', (req, res) => {

});

router.post('/', (req, res) => {
    Comment.create({
        content: req.body.content,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

router.delete('/', (req, res) => {

});

module.exports = router;