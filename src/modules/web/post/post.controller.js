import { wrapError } from '@/utils/common';
import * as PostService from './post.service';
import { fileUploadUrl, getRequestFileName } from '@/utils';

const renderNewPost = (res, data = {}) => {
  const { errors = [], oldInput = {}, categories = [] } = data;

  res.render('web/pages/new-post', {
    categories,
    errors,
    oldInput,
  });
};

export const getNewPost = wrapError((req, res) => {
  return PostService.getPostData().then((categories) => {
    renderNewPost(res, {
      categories,
    });
  });
});

export const postNewPost = wrapError((req, res) => {
  const data = {
    title: req.body.title,
    slug: req.body.slug,
    content: req.body.content,
    category: req.body.category,
    summary: req.body.summary,
    tags: req.body.tags,
    status: req.body.status === 'PUBLISH' ? 'PUBLISH' : 'DRAFT',
    thumbnail: getRequestFileName('thumbnail', req),
  };
  const errors = req.joiError || req.multerError;
  const renderInvalid = (err) => {
    return PostService.getPostData().then((categories) => {
      res.status(422);
      return renderNewPost(res, {
        errors: err,
        oldInput: {
          ...data,
          thumbnail_url: fileUploadUrl(data.thumbnail),
        },
        categories,
      });
    });
  };

  if (errors) {
    return renderInvalid(errors);
  }

  return PostService.createPost(data, req.currentUser)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      console.error(err);
      return renderInvalid([err]);
    });
});

// ------------------------------------------------------------------------------------------------------------------ //

export const renderPostDetail = (req, res, data = {}) => {
  const { id } = req.params;
  const commentErrors = req.flash('commentErrors');
  const commentData = req.flash('commentData');
  const { errors = commentErrors || [], oldComment = commentData || {} } = data;

  return Promise.all([PostService.getPostDetail(id, req.currentUser)]).then(([post]) => {
    console.log(post)
    if (post) {
      res.render('web/pages/post-detail', {
        post,
        errors,
        oldComment,
      });
    } else {
      res.redirect('/404');
    }
  });
};

export const getPostDetail = wrapError((req, res) => {
  return renderPostDetail(req, res);
});

// ------------------------------------------------------------------------------------------------------------------ //
