import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegistrationForm from './components/registrationForm/RegistrationForm';
import Login from './components/login/Login';
import Home from './components/home/Home';





function App() {
   
   const router= createBrowserRouter([
    {
      path:'/',
      element : <RegistrationForm/> }
      ,
      {
      path : '/login',
      element : <Login/>
      },{
        path: '/home',
        element :<Home/>
      }
   ])

  return (
    <div className="App">
      <RouterProvider router={router}  />

    </div>
  );
}

export default App;
