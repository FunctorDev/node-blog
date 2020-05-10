import { parseToken } from '@/helpers/jwt';
import Models from '@/models';

const UserModel = Models.user;

const withAuthenticate = ({ ignoreExpiration = false } = {}) => (
  req,
  res,
  next,
) => {
  Promise.resolve()
    .then(() => {
      const cookies = req.cookies;
      const token = cookies.token;

      if (token) {
        const jwtParsed = parseToken(token, { ignoreExpiration });

        return jwtParsed
          ? Promise.resolve(jwtParsed)
          : Promise.reject(new Error('Invalid token'));
      }

      return Promise.reject(new Error('Authorization cookie is required'));
    })
    .then((jwtParsed) => {
      return UserModel.findByPk(jwtParsed.id).then((currentUser) => {
        req.jwtParsed = jwtParsed;
        req.currentUser = currentUser;
      });
    })
    .then(() => next())
    .catch(() => {
      next();
      // res.redirect('/auth/login');
    });
};

export default withAuthenticate;
