// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { isAuth } from "../middleware/ProtectedRoutes";

// const useSession = () => {

//     const session = isAuth()
//     const decodedSession = session ? jwtDecode(session) : null;

//     const navigate = useNavigate()

//     useEffect(() => {

//         if (!session) {

//             navigate('/', { replace: true })
//         }

//     }, [navigate, session]);


//     return decodedSession;
// };

// export default useSession;


// consegnato così
// import { jwtDecode } from "jwt-decode";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useEffect } from "react";
// import { isAuth } from "../middleware/ProtectedRoutes";

// const useSession = () => {
//     const session = isAuth();
//     const decodedSession = session ? jwtDecode(session) : null;
//     const navigate = useNavigate();
//     const location = useLocation();

//     useEffect(() => {
//         // Verifica se la pagina corrente è la pagina NewAccount
//         const isLoginPage = location.pathname === '/login';
//         const isNewAccountPage = location.pathname === '/newAccount';

//         // Se la sessione non è presente e la pagina non è il login o la NewAccount,
//         // reindirizza l'utente alla pagina di login
//         if (!session && !isLoginPage && !isNewAccountPage) {
//             navigate('/', { replace: true });
//         }

//     }, [navigate, session, location.pathname]);

//     return decodedSession;
// };

// export default useSession;

import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { isAuth } from "../middleware/ProtectedRoutes";

const useSession = () => {
    const session = isAuth();
    const decodedSession = session ? jwtDecode(session) : null;
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const isLoginPage = location.pathname === '/login';
        const isNewAccountPage = location.pathname === '/newAccount';
        const isGestionalePage = location.pathname === '/gestionale';
        const isNewGamePage = location.pathname === '/newGame';

        //se non sei loggato puoi solo fare il login o registrarti
        if (!session && !isLoginPage && !isNewAccountPage) {
            navigate('/', { replace: true });
        } else if (
            //blocco accesso alla pagina dedicata agli admin
            (isGestionalePage || isNewGamePage) &&
            (!session || (session && decodedSession?.role !== "admin"))
        ) {
            // Se l'utente è loggato ma non ha il ruolo "admin", reindirizza altrove
            navigate('/unauthorized', { replace: true });
        }

    }, [navigate, session, location.pathname, decodedSession]);

    return decodedSession;
};

export default useSession;


