import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css"
import { RouterProvider } from "react-router";
import router from "./Routes/index.ts";
import { ThemeProvider } from "./Provider/theme-provider.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.ts";
  import { Bounce, ToastContainer } from 'react-toastify';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
   </Provider>
     <ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
transition={Bounce}
/>
  </StrictMode>
);
