import React from "react";
import MyNav from "../components/navbar/MyNav";
import MyFooter from "../components/footer/MyFooter";

const MainLayout = ({ children }) => {

    return (
        <>
            <MyNav />
            {children}
            <MyFooter />
        </>
    )
}
export default MainLayout