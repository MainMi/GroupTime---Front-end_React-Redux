import './App.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/Root/RootLayout';
import AboutPage from './pages/About/AboutPage';
import SingPage from './pages/Sing/SingPage';
import ProfilePage from './pages/Profile/ProfilePage';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout/>,
      children: [
        { path: '/', element: <AboutPage/> },
        { path: '/sing', element: <SingPage/> },
        { path: '/profile', element: <ProfilePage/> },
      ]
    }
  ])



  return (
    <RouterProvider router={router}/>
  );
}

export default App;
