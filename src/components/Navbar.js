import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Navbar.css"; // Importing the CSS file for styles

// Home Button Component
const HomeButton = () => {
  const navigate = useNavigate();
  return (
    <motion.div whileHover={{ scale: 1.1 }}>
      <Button
        color="inherit"
        onClick={() => navigate("/")}
        sx={{
          // backgroundColor: "#FF6F61",
          color: "#F9F7F7",

          textTransform: "uppercase",
          fontWeight: "500",
          marginRight: { xs: 1, sm: 2 },
          // fontFamily: "poppins",
          fontSize: { xs: "1rem", sm: "1.2rem" },

          "&:hover": {
            color: "#4A4E69",
            backgroundColor: "#F9F7F7",
            transition: "0.3s",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          },
        }}
      >
        Home
      </Button>
    </motion.div>
  );
};

// Checkbill Button Component
const CheckbillButton = () => {
  const navigate = useNavigate();
  return (
    <motion.div whileHover={{ scale: 1.1 }}>
      <Button
        color="inherit"
        onClick={() => navigate("/checkbill")}
        sx={{
          // backgroundColor: "#6A994E",
          color: "#F9F7F7",
          marginRight: { xs: 1, sm: 2 },
          // fontFamily: "poppins",
          fontSize: { xs: "1rem", sm: "1.2rem" },
          textTransform: "uppercase",
          fontWeight: "500",
          "&:hover": {
            color: "#4A4E69",
            backgroundColor: "#F9F7F7",
            transition: "0.3s",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          },
        }}
      >
        Checkbill
      </Button>
    </motion.div>
  );
};

// Summary Button Component
const SummaryButton = () => {
  const navigate = useNavigate();
  return (
    <motion.div whileHover={{ scale: 1.1 }}>
      <Button
        color="inherit"
        onClick={() => navigate("/summary")}
        sx={{
          // backgroundColor: "#BC4749",
          color: "#F9F7F7",
          marginRight: { xs: 1, sm: 2 },
          // fontFamily: "poppins",
          fontSize: { xs: "1rem", sm: "1.2rem" },
          textTransform: "uppercase",
          fontWeight: "500",
          "&:hover": {
            color: "#4A4E69",
            backgroundColor: "#F9F7F7",
            transition: "0.3s",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          },
        }}
      >
        Summary
      </Button>
    </motion.div>
  );
};

// StatusDebtor Button Component
const StatusDebtorButton = () => {
  const navigate = useNavigate();
  return (
    <motion.div whileHover={{ scale: 1.1 }}>
      <Button
        color="inherit"
        onClick={() => navigate("/statusdebtor")}
        sx={{
          // backgroundColor: "#0077B6",
          color: "#F9F7F7",
          fontFamily: "",
          fontSize: { xs: "1rem", sm: "1.2rem" },
          textTransform: "uppercase",
          fontWeight: "500",
          "&:hover": {
            color: "#4A4E69",
            backgroundColor: "#F9F7F7",
            transition: "0.3s",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          },
        }}
      >
        Status Debtor
      </Button>
    </motion.div>
  );
};

// Main Navbar Component
const Navbar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        mb: 4,
        backgroundColor: "#4A4E69",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        padding: { xs: "8px", sm: "16px" },
      }}
    >
      <Toolbar>
        <HomeButton />
        <CheckbillButton />
        <SummaryButton />
        <StatusDebtorButton />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
