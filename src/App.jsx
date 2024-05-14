import { Suspense } from "react";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainSpinner from "./components/MainSpinner";
function App() {
  const queryClient = new QueryClient();

  return (
    <div className="w-full h-full">
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<MainSpinner />}>
          <Header />
          <main className="w-full ">
            <Outlet />
          </main>
          <Footer />
        </Suspense>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
