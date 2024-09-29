import React, { useEffect, useState } from 'react';
import { Button, Typography, Box, Grid, Paper, Input, TextField, Select, MenuItem, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';

const Summary = () => {
  const [participants, setParticipants] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [totalAmounts, setTotalAmounts] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('');
  const [qrCodeFile, setQrCodeFile] = useState(null);
  const [promptPayNumber, setPromptPayNumber] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [bankName, setBankName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedParticipants = JSON.parse(localStorage.getItem('participants'));
    const savedFoodItems = JSON.parse(localStorage.getItem('foodItems'));

    if (savedParticipants) setParticipants(savedParticipants);
    if (savedFoodItems) {
      setFoodItems(savedFoodItems);
      calculateTotals(savedParticipants, savedFoodItems);
    }
  }, []);

  const calculateTotals = (participants, items) => {
    const totals = {};
    participants.forEach(participant => {
      totals[participant] = { total: 0, foods: [] };
    });

    items.forEach(item => {
      const splitPrice = item.price / item.participants.length;
      item.participants.forEach(participant => {
        if (totals[participant]) {
          totals[participant].total += splitPrice;
          totals[participant].foods.push({ name: item.name, price: splitPrice });
        }
      });
    });

    setTotalAmounts(totals);
    localStorage.setItem('totalAmounts', JSON.stringify(totals));
  };

  const handleQrCodeChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setQrCodeFile(URL.createObjectURL(file));
    }
  };

  const saveSlipAsImage = () => {
    const slipElement = document.getElementById('summary-slip');
    
    html2canvas(slipElement, {
      backgroundColor: '#1a1a2e', // Set a dark background color to match the style
      scale: 2, // Increase the scale for better resolution
    }).then(canvas => {
      // Adjust brightness/contrast here by rendering it on another canvas
      const image = canvas.toDataURL('image/png');
      const newCanvas = document.createElement('canvas');
      const ctx = newCanvas.getContext('2d');
      
      newCanvas.width = canvas.width;
      newCanvas.height = canvas.height;

      // Optional: Apply brightness/contrast filter
      ctx.filter = 'brightness(0.9) contrast(1.1)';
      ctx.drawImage(canvas, 0, 0);

      const link = document.createElement('a');
      link.href = newCanvas.toDataURL('image/png');
      link.download = 'summary-slip.png';
      link.click();
    });
  };

  const handleBackClick = () => {
    navigate('/checkbill');
  };

  const filteredParticipants = participants.filter(participant => 
    participant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (Object.keys(totalAmounts).length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center', background: '#2E2E2E', borderRadius: '12px', color: '#ffffff' }}>
        <Typography variant="h5" sx={{ color: '#ffffff' }}>
          Please fill out the CheckBill information first.
        </Typography>
        <Button 
          variant="contained" 
          onClick={handleBackClick} 
          sx={{ mt: 2, backgroundColor: '#3f51b5', '&:hover': { backgroundColor: '#303f9f' } }}
        >
          Go to Check Bill
        </Button>
      </Box>
    );
  }

  return (
    <Box id="summary-slip" sx={{
      p: 3,
      background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      maxWidth: '800px',
      mx: 'auto',
      mt: 4,
      position: 'relative',
      overflow: 'hidden',
      color: '#ffffff',
    }}>
      <Typography variant="h3" align="center" sx={{
        mb: 3,
        fontWeight: 'bold',
        textShadow: '0 0 10px rgba(233, 69, 96, 0.8)',
      }}>
        🚀 Receipt Summary
      </Typography>

      <TextField 
        variant="outlined" 
        placeholder="Search Participants" 
        onChange={(e) => setSearchTerm(e.target.value)} 
        sx={{ mb: 3, width: '100%', backgroundColor: '#ffffff', borderRadius: '8px' }} 
      />

      <Grid container spacing={2} justifyContent="center">
        {filteredParticipants.map((participant, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <motion.div 
              initial={{ opacity: 0, translateY: 20 }} 
              animate={{ opacity: 1, translateY: 0 }} 
              transition={{ duration: 0.5 }}
            >
              <Paper elevation={8} sx={{
                padding: 3,
                margin: '10px 0',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid #e94560',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                },
              }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
                  {participant}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#e94560' }}>
                  Total: {totalAmounts[participant]?.total.toFixed(2) || 0} ฿
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: 1, color: '#ffffff' }}>
                  Food Items:
                </Typography>
                {totalAmounts[participant]?.foods.map((food, foodIndex) => (
                  <Typography variant="body2" key={foodIndex} sx={{ pl: 2, color: '#ffffff' }}>
                    - {food.name}: {food.price.toFixed(2)} ฿
                  </Typography>
                ))}
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Payment Method Section */}
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#ffffff' }}>
          Payment Method
        </Typography>
        
        <FormControl variant="outlined" sx={{ mb: 2, minWidth: 200, border: '2px solid white' }}>
          <InputLabel id="payment-method-label" sx={{ color: '#ffffff' }}>Select Payment Method</InputLabel>
          <Select
            labelId="payment-method-label"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            label="Select Payment Method"
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // Set the border color
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e94560', // Change border color on hover
              },
              '& .MuiSelect-select': {
                color: '#ffffff' // Set text color
              },
            }}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="qr-code">QR Code</MenuItem>
            <MenuItem value="promptpay">PromptPay</MenuItem>
            <MenuItem value="bank-account">Bank Account</MenuItem>
          </Select>
        </FormControl>

        {/* Conditional Rendering Based on Payment Method */}
        {paymentMethod === 'qr-code' && (
          <Box>
            <Input type="file" onChange={handleQrCodeChange} sx={{ mb: 2, color: '#ffffff' }} />
            {qrCodeFile && (
              <motion.img 
                src={qrCodeFile} 
                alt="QR Code" 
                style={{ width: '100%', marginTop: '20px', borderRadius: '8px' }} 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5 }} 
              />
            )}
          </Box>
        )}

        {paymentMethod === 'promptpay' && (
          <Box>
            <Typography variant="body1" sx={{ color: '#ffffff', fontWeight: 'bold', marginBottom: 1 }}>
              PromptPay: 
            </Typography>
            <OutlinedInput 
              placeholder="Enter PromptPay Number" 
              value={promptPayNumber} 
              onChange={(e) => setPromptPayNumber(e.target.value)} 
              sx={{ mb: 2, width: '100%', backgroundColor: '#ffffff', borderRadius: '8px', fontSize: '14px', height: '40px' }} 
            />
          </Box>
        )}

        {paymentMethod === 'bank-account' && (
          <Box>
            <Typography variant="body1" sx={{ color: '#ffffff', fontWeight: 'bold', marginBottom: 1 }}>
              Bank Account: 
            </Typography>
            <OutlinedInput 
              placeholder="Enter Bank Account Number" 
              value={bankAccount} 
              onChange={(e) => setBankAccount(e.target.value)} 
              sx={{ mb: 1, width: '100%', backgroundColor: '#ffffff', borderRadius: '8px', fontSize: '14px', height: '40px' }} 
            />
            <OutlinedInput 
              placeholder="Enter Bank Name" 
              value={bankName} 
              onChange={(e) => setBankName(e.target.value)} 
              sx={{ mb: 2, width: '100%', backgroundColor: '#ffffff', borderRadius: '8px', fontSize: '14px', height: '40px' }} 
            />
          </Box>
        )}
      </Box>

      <Button 
        variant="contained" 
        onClick={saveSlipAsImage} 
        sx={{ mt: 3, backgroundColor: '#e94560', '&:hover': { backgroundColor: '#d83b5c' } }}
      >
        Save Slip as Image
      </Button>
    </Box>
  );
};

export default Summary;
