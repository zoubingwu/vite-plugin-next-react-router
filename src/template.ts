export const generateRoutesCode = ({ layoutImport, routes }: any) => `
import React from 'react';
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
${layoutImport}

const router = createBrowserRouter([${routes}])

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
`;
