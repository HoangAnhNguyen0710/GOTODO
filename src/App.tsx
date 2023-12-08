import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home, NotFound, Auth, Login, Signup } from "./pages";
import { useAuth } from "./hooks/useAuth";

function App() {
  const user = useAuth();
  // console.log(user);
 
  React.useEffect(() => {
    /* 
                          dung xoa de namduong test nha :D
    */

    // async function getFavouriteFood() {
    //   console.log(await getFavouriteFoodList());
    // }
    // getFavouriteFood();
    // async function createMockUser() {
    //   console.log(await createUser(testUser, "12345678"));
    // }
    // // createMockUser();
    // async function LoginTest() {
    //   console.log(await UserLogin("hoanganhdepzai123@gmail.com", "12345678"));
    // }

    // async function addCoupon() {
    //   console.log(await createNewCoupon(testCoupon));
    // }

    // async function getReview() {
    //   console.log(await getFoodReviewsById("2"));
    // }

    // async function deleteReviewById() {
    //   console.log(await deleteFoodReview("5lMCOnPVJ3MfwBOYkGPM"));
    // }

    // addCoupon();
    // getReview();
    // deleteReviewById();
    // LoginTest();
  }, []);
  const [query, setQuery] = useState("");
  const [searchOption, setSearchOption] = useState(1);
  const getQueryDataHandler = (query: string, option: number) => {
    setQuery(query);
    setSearchOption(option);
  };

  return (
    <>
        <Routes>
          <Route path="auth" element={<Auth />}>
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<Signup />} />
          </Route>
          
            <Route path="/" element={<Home/>}>
              {/* <Route path="food/:id" element={<FoodDetail></FoodDetail>}></Route> */}
            </Route>
          
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
    </>
  );
}

export default App;
