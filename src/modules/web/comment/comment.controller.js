import { wrapError } from '@/utils/common';
import * as CommentService from './comment.service';
import * as PostService from '@/modules/web/post/post.service';

export const addNewComment = wrapError((req, res) => {
  const data = {
    content: req.body.content,
  };
  const postId = req.body.postId;
  const errors = req.joiError;
  const renderInvalid = (err) => {
    PostService.getPostDetail(postId).then((post) => {
      req.flash('commentErrors', err);
      req.flash('commentData', data);
      res.redirect(`/posts/${post.slug}`);
    });
  };

  if (errors) {
    return renderInvalid(errors);
  }

  return CommentService.addNewComment(data, req.currentUser, postId)
    .then(() => PostService.getPostDetail(postId))
    .then((post) => {
      res.redirect(`/posts/${post.slug}`);
    })
    .catch((err) => {
      console.error(err);
      return renderInvalid([err]);
    });
});

// ------------------------------------------------------------------------------------------------------------------ //
