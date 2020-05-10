import { wrapError } from '@/utils/common';
import * as CommentService from './like.service';
import * as PostService from '@/modules/web/post/post.service';

export const addPostLike = wrapError((req, res) => {
  const postId = req.body.postId;
  const errors = req.joiError;
  const renderInvalid = (err) => {
    PostService.getPostDetail(postId).then((post) => {
      req.flash('likeErrors', err);
      res.redirect(`/posts/${post.slug}`);
    });
  };

  if (errors) {
    return renderInvalid(errors);
  }

  return CommentService.addPostLike(req.currentUser, postId)
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
