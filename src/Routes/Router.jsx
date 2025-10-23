import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/LoginPage/Login";
import Register from "../Pages/RegisterPage/Register";
import AddProduct from "../Pages/AddProduct/AddProduct";
import PrivateRoute from "./PrivateRoute";
import AllProduct from "../Pages/AllProduct/AllProduct";
import UpdateProduct from "../Pages/UpdateProduct/UpdateProduct";
import CategoryProducts from "../Pages/CategoryProducts/CategoryProducts";
import CategoryProductDetails from "../Pages/CategoryProductDetails/CategoryProductDetails";
import Cart from "../Pages/MyCart/Cart";
import ErrorPage from "../Pages/404Page/ErrorPage";
import Categories from "../Pages/Categories/Categories";
import Favorite from "../Pages/Favorite/Favorite";
// import CategoryProducts from "../Pages/CategoryProducts/CategoryProducts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/addProduct",
        element: (
          <PrivateRoute>
            <AddProduct></AddProduct>
          </PrivateRoute>
        ),
      },{
        path:"/categories",
        element: <Categories></Categories>
      },
      {
        path:"/love",
        element: <PrivateRoute><Favorite></Favorite></PrivateRoute>
      },
      {
        path: "/allProduct",
        element: (
          <PrivateRoute>
            <AllProduct></AllProduct>
          </PrivateRoute>
        ),
      },
      {
        path: "/update-product/:id",
        element: (
          <PrivateRoute>
            <UpdateProduct />
          </PrivateRoute>
        ),
      },{
        path:"/category/:categoryName",
        element: <CategoryProducts></CategoryProducts>
      },{
        path: "/product/:id",  
        element: <PrivateRoute><CategoryProductDetails /></PrivateRoute>,
      },{
        path:"/cart",
        element: <PrivateRoute><Cart></Cart></PrivateRoute>
      }
    ],
  },
]);
