import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import Login from './page/Login/Login'
import Register from './page/Register/Register'
import viteLogo from '/vite.svg'
import Layout from './components/Layout/Layout';
import toast, { Toaster } from 'react-hot-toast';
import HOme from './page/Home/HOme';
import Profile from './page/Profile/Profile'
import ProtectedRouter from './components/ProtectedRouter/ProtectedRouter'
import GuestRouter from './components/GuestRouter/GuestRouter';
import TokenProvider from './Context/Token/Token.Context';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import Comments from './page/Comments/Comments'

function App() {
  const routes=createBrowserRouter([
    {path:'',element:<ProtectedRouter><Layout /></ProtectedRouter>,
      children:[{path:'/Home', element:<HOme/>},
       {path:'/Profile',element:<Profile/>},
       {path:'/Comments/:id',element:<Comments/>},
    ]},
    {path :'',element:<GuestRouter> <Layout/> </GuestRouter>,children:[
      {path :'/Register',element:<Register/>},
      {path:'/Login',element:<Login/>},]},
      ])

 
       const  client=new QueryClient('Get All Post')
  return (
   <>
   <TokenProvider>
   <QueryClientProvider client={client}>
   <RouterProvider router={routes}/>
     <Toaster />
     </QueryClientProvider>
     </TokenProvider>
    </>
  )
}

export default App
