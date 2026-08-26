import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ user, setUser, children }) {
  return (
    <>
      <Navbar user={user} setUser={setUser} />

      <main>
        {children}
      </main>

      <Footer />
    </>
  );
}

export default Layout;