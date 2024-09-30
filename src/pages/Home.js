import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Grid, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import "./Home.css"; // CSS file for styles
import QRCode from "../pics/QRcode.jpg"; // Import QR code image

export default function Home() {
  const navigate = useNavigate();

  const navigateTo = (page) => {
    navigate(`/${page}`);
  };

  // ฟังก์ชันสำหรับรีเซ็ตข้อมูลทั้งหมด
  const handleResetData = () => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการรีเซ็ตข้อมูลทั้งหมด?")) {
      localStorage.clear();
      alert("ข้อมูลทั้งหมดถูกรีเซ็ตแล้ว");
      navigate("/");
    }
  };

  return (
    <Container className="home-container">
      <motion.div
        className="home-title"
        animate={{ y: [0, -15, 0] }} // Floating effect for the title
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Typography variant="h2">Welcome to GlaHarn</Typography>
      </motion.div>
      <Grid container spacing={5} justifyContent="center">
        {["CheckBill", "Summary", "StatusDebtor"].map((page, index) => (
          <Grid item key={index}>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Button
                variant="contained"
                className="home-button"
                onClick={() => navigateTo(page.toLowerCase())}
                sx={{
                  backgroundColor: "white",
                  color: "black", // Set the text color
                  "&:hover": {
                    backgroundColor: "#f0f0f0", // Hover background color
                  },
                }}
              >
                {page}
              </Button>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* ปุ่ม Reset All Data */}
      <Box sx={{ textAlign: "center", marginTop: 1 }}>
        <Button
          variant="contained"
          color="error"
          onClick={handleResetData}
          sx={{ marginTop: "30px", padding: "10px 20px" }}
        >
          Reset Data to Start Fresh
        </Button>
      </Box>
      <Box
        sx={{
          border: "2px solid #1976d2", // Change the border color as needed
          borderRadius: "8px",
          padding: "16px",
          marginTop: "100px",
          backgroundColor: "#f5f5f5", // Light background color
        }}
      >
        <Typography variant="h6" className="info-text" sx={{ color: "black" }}>
          I developed this project to tackle the challenges students encounter
          when sharing the costs of food and drinks. My goal is to simplify the
          process of splitting expenses during gatherings. Notably, this project
          was created with nearly 100% assistance from ChatGPT. If you have any
          suggestions or feedback, please don't hesitate to share them with me.
        </Typography>
      </Box>

      {/* QR Code Section */}
      <Box sx={{ textAlign: "center", marginTop: 5 }}>
        <Typography variant="body2" sx={{ marginBottom: 1 }}>
          สนใจสนับสนุนผู้พัฒนา
        </Typography>
        <img
          src={QRCode}
          alt="QR Code"
          style={{ width: "250px", height: "250px", objectFit: "contain" }} // Increase size and maintain aspect ratio
        />
      </Box>
    </Container>
  );
}
