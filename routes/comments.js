// =====================
// COMMENTS ROUTES
// =====================

var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');


// NEW COMMENT FORM
router.get('/new', middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err ,campground){
        if(err){
            console.log(err);
        } else {
            res.render('comments/new', {campground: campground});
        }
    })
});

// CREATE COMMENT
router.post('/', middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect('campgrounds');
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash('error', "Something went wrong....");
                    console.log(err);
                } else {
                    var commentAuthor = comment.author;
                    var currentUser = req.user;

                    commentAuthor.id = currentUser._id;
                    commentAuthor.username = currentUser.username;
                    comment.save();

                    campground.comments.push(comment);
                    campground.save();
                    req.flash('success', "Comment created!");                    
                    res.redirect('/campgrounds/' + campground._id);
                }
            })
        }
    });
});

// EDIT
router.get('/:comments_id/edit', middleware.isLoggedIn, middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comments_id, function(err, foundComment){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            res.render('comments/edit', {campgroundID: req.params.id, comment: foundComment});            
        }
    });
});

// UPDATE
router.put('/:comments_id/', middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comments_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect('back');
        } else {
            req.flash('success', "Comment updated!");                                            
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
});

// DESTROY
router.delete('/:comments_id', middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comments_id, function(err){
        if(err){
            res.redirect('back');
        } else {
            req.flash('success', "Comment deleted!");                                            
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

module.exports = router;