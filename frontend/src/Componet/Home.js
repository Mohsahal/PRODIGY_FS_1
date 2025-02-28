import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, User, Settings, Bell } from 'lucide-react';
import { toast } from 'react-toastify';

const Home = () => {
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in to access the dashboard.');
      navigate('/login');
    }
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully.');
    navigate('/login');
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-vh-100 py-5">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container">
          <Link to="/" className="navbar-brand">Dashboard</Link>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            <LogOut size={18} className="me-2" />
            Logout
          </button>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="container" style={{ marginTop: '80px' }}>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="row g-4"
        >
          {/* Profile Card */}
          <motion.div variants={item} className="col-md-4">
            <div className="card home-card h-100">
              <div className="card-body text-center">
                <User size={40} className="text-primary mb-3" />
                <h5 className="card-title">Profile</h5>
                <p className="card-text">View and edit your profile information</p>
                <Link to="/profile" className="btn btn-outline-primary">View Profile</Link>
              </div>
            </div>
          </motion.div>

          {/* Notifications Card */}
          <motion.div variants={item} className="col-md-4">
            <div className="card home-card h-100">
              <div className="card-body text-center">
                <Bell size={40} className="text-warning mb-3" />
                <h5 className="card-title">Notifications</h5>
                <p className="card-text">Check your latest notifications</p>
                <Link to="/notifications" className="btn btn-outline-warning">View Notifications</Link>
              </div>
            </div>
          </motion.div>

          {/* Settings Card */}
          <motion.div variants={item} className="col-md-4">
            <div className="card home-card h-100">
              <div className="card-body text-center">
                <Settings size={40} className="text-success mb-3" />
                <h5 className="card-title">Settings</h5>
                <p className="card-text">Manage your account settings</p>
                <Link to="/settings" className="btn btn-outline-success">Open Settings</Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="row mt-4"
        >
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Welcome to Your Dashboard</h5>
                <p className="card-text">
                  This is your personal dashboard where you can manage your account,
                  view notifications, and adjust your settings. Feel free to explore
                  the different features available to you.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;



