import { wrapError } from '@/utils/common';
import * as HomeService from './home.service';

export const homePage = wrapError((req, res) => {
  HomeService.getDataHomePage().then((listPost) => {
    res.render('web/pages/home', {
      listPost,
    });
  });
});
