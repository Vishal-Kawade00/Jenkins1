import React, { useEffect } from "react";
import { useSimulation } from "../store/SimulationContext";

const Alert = () => {
  const { alert, closeAlert } = useSimulation();

  // Auto-hide after 3 seconds
  useEffect(() => {
    if (alert.visible) {
      const timer = setTimeout(() => {
        closeAlert();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [alert.visible, closeAlert]);

  if (!alert.visible) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
      {alert.message}
    </div>
  );
};

export default Alert;
