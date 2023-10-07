import { useEffect } from "react";

export const useAdminAuth = (navigate) => {
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin");
    }
  }, [navigate]);
};
