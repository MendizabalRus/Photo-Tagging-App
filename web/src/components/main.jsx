// Packages
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router";

// Style
import '../style/main.css';
import '../style/variables.css';
import '../style/reset.css';

// Files
import { AuthProvider } from '../context/authContext.jsx';
import routes from "./Routes.jsx";

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
);
