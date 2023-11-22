import React from "react";
import { Typewriter } from "react-simple-typewriter"
import logoM2 from "../../assets/m2playerLogo.png"

const MyWelcome = () => {

    return (
        <>
            <div className="container text-center m-t-IdPage component-bg ">
                <div className="jumbotron mt-5">
                    <img className="blog-navbar-brand mb-1" alt="logo" src={logoM2} />
                    <p className="lead fw-bold">IL BELLO DI GIOCARE INSIEME</p>
                    <hr className="my-4" />

                    <h1 style={{ padding: '30px', margin: 'auto 0', fontWeight: 'normal' }}>
                        Game & Post per: <br /> {' '}
                        <span style={{ color: 'green', fontWeight: 'bold' }}>
                            {/* Style will be inherited from the parent element */}
                            <Typewriter
                                words={['PlayStation', 'XBOX', 'Nintendo', 'PC']}
                                loop={100}
                                cursor
                                cursorStyle='_'
                                typeSpeed={100}
                                deleteSpeed={100}
                                delaySpeed={1000}
                            />
                        </span>
                    </h1>

                </div>
            </div >
        </>
    )
}

export default MyWelcome