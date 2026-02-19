import React, { useEffect, useState } from "react";
import SideBar from "../component/common/SideBar";
import { Outlet } from "react-router-dom";
import Footer from "../component/common/Footer";
import Navbar from "../component/common/Navbar";
import BackToTop from "../component/common/BackToTop";
import PageLoader from "../component/common/PageLoader";
import { api } from "../utils/app";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [globalData, setGlobalData] = useState({
    note: null,
    service: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        setLoading(true);

        const [noteRes, serviceRes] = await Promise.all([
          api.get("/notes"),
          api.get("/service-type")
        ]);

        console.log("Global API responses:", {
          note: noteRes,
          service: serviceRes
        });
        setGlobalData({
          note: noteRes.data.data,
          service: serviceRes.data.data
        });
      } catch (error) {
        console.error("Global API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGlobalData();
  }, []);


  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleMenu={toggleSidebar} noteData={globalData.note} serviceData={globalData.service} />
      <SideBar toggleMenu={toggleSidebar} isOpen={sidebarOpen} />
      <Outlet />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default AppLayout;
