import Error from './common/Error';
import BookmarkContainer from './pages/Bookmark/BookmarkContainer';
import HomePageContainer from './pages/HomePage/HomePageContainer';
import SearchContainer from './pages/Search/SearchContainer';

const route = [
  // Home Route
  {
    path: '/',
    component: HomePageContainer,
  },
  //   Bookmarks Route
  {
    path: '/bookmark',
    component: BookmarkContainer,
  },
  //   Search Route
  {
    path: '/search',
    component: SearchContainer,
  },
  //List property route
  {
    path: '/list',
    component: BookmarkContainer,
  },
  //   Error Route
  {
    path: '*',
    component: Error,
  },
];

export default route;
