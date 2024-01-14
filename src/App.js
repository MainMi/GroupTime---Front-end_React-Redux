import './App.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/Root/RootLayout';
import AboutPage from './pages/About/AboutPage';
import SignPage from './pages/Sign/SignPage';
import ProfilePage from './pages/Profile/ProfilePage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout/>,
      children: [
        { path: '/', element: <AboutPage/> },
        { path: '/sign', element: <SignPage/> },
        { path: '/profile', element: <ProfilePage/> },
      ]
    }
  ]);

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
