import React from "react";
import MainLayout from "../../layouts/MainLayout";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HouseFill } from "react-bootstrap-icons";


const NotFound = () => {


    return (
        <MainLayout>

            <div className="text-center container component-bg m-t-NotFound">
                <h1 className="fw-bold"> 404 </h1>
                <h3 className="fw-bold mb-5">Pagina non trovata</h3>

                <Link
                    to={"/home"}

                >
                    <Button className="mb-3" variant="outline-success">
                        Home <HouseFill className="ms-2" size={25} />
                    </Button>
                </Link>
            </div>

        </MainLayout>
    )
}

export default NotFound;