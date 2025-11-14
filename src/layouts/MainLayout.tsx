import React from "react";
import Header from "../components/Header";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout: React.FC = () => {
  const location = useLocation();

  // определяем, нужно ли показывать Header
  const hideHeaderOn = ["/login", "/register"];
  const shouldHideHeader = hideHeaderOn.includes(location.pathname);

  return (
    <div>
      {!shouldHideHeader && <Header />}
      <main style={{ paddingTop: shouldHideHeader ? "0" : "70px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;


