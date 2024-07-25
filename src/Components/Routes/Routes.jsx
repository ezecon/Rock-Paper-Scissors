import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Start from "../Start/Start";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
    },
    {
        path: "/start",
        element: <Start/>,
    },

    {
        path: '*',
        element: <div>404 Not Found</div>
    }
]);

export default router;
