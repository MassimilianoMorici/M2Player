import React from 'react';
import { Facebook, Github, Instagram, Linkedin } from 'react-bootstrap-icons';

const MyFooter = () => {
    return (
        <footer className="bg-dark text-light py-3">
            <div className='container'>
                <div className='d-flex justify-content-around mt-4'>
                    <div>
                        <Instagram className='' size={30} />

                        <Facebook className='mx-3' size={30} />

                        <Linkedin size={30} />

                        <Github className='mx-3' size={30} />

                        <p className='mt-3'>Centro assistenza</p>
                        <p className='mt-3'>Note legali</p>
                        <p className='mt-3'>2023 M2PLAYER</p>
                    </div>

                    <div>
                        <br />
                        <p className='mt-4'>Contattaci</p>
                        <p className='mt-3'>Media Center</p>
                        <p className='mt-3'>Informazioni</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default MyFooter;