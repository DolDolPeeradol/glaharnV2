import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/system";

const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

const ResponsiveAccordion = styled(Accordion)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(0.5),
  },
}));

export default function StatusDebtor() {
  const [participants, setParticipants] = useState([]);
  const [totalAmounts, setTotalAmounts] = useState({});
  const [payments, setPayments] = useState({});
  const [status, setStatus] = useState({});
  const [paymentHistory, setPaymentHistory] = useState({});
  const [tempPayments, setTempPayments] = useState({});
  const [editHistory, setEditHistory] = useState({}); // To store edit values

  useEffect(() => {
    const storedParticipants = JSON.parse(localStorage.getItem("participants")) || [];
    const storedTotalAmounts = JSON.parse(localStorage.getItem("totalAmounts")) || {};
    const storedPayments = JSON.parse(localStorage.getItem("payments")) || {};
    const storedHistory = JSON.parse(localStorage.getItem("paymentHistory")) || {};

    setParticipants(storedParticipants);
    setTotalAmounts(storedTotalAmounts);
    setPayments(storedPayments);
    setPaymentHistory(storedHistory);

    const initialStatus = {};
    storedParticipants.forEach((participant) => {
      initialStatus[participant] = "Pending";
    });
    setStatus(initialStatus);
  }, []);

  const handlePaymentChange = (participant, amount) => {
    const updatedTempPayments = {
      ...tempPayments,
      [participant]: parseFloat(amount) || "",
    };
    setTempPayments(updatedTempPayments);
  };

  const handleSubmitPayment = (participant) => {
    const paymentAmount = parseFloat(tempPayments[participant]) || 0;

    const updatedPayments = {
      ...payments,
      [participant]: (payments[participant] || 0) + paymentAmount,
    };
    setPayments(updatedPayments);
    localStorage.setItem("payments", JSON.stringify(updatedPayments));

    const newPaymentHistory = { ...paymentHistory };
    if (!newPaymentHistory[participant]) {
      newPaymentHistory[participant] = [];
    }
    newPaymentHistory[participant].push({
      amount: paymentAmount,
      date: new Date().toLocaleDateString(),
    });
    setPaymentHistory(newPaymentHistory);
    localStorage.setItem("paymentHistory", JSON.stringify(newPaymentHistory));

    setStatus((prevStatus) => ({
      ...prevStatus,
      [participant]: updatedPayments[participant] >= (totalAmounts[participant]?.total || 0) ? "Paid" : "Pending",
    }));

    setTempPayments((prev) => ({ ...prev, [participant]: "" }));
  };

  const calculateRemaining = (participant) => {
    const totalAmount = totalAmounts[participant]?.total || 0;
    const paidAmount = payments[participant] || 0;
    return totalAmount - paidAmount;
  };

  const handleResetHistory = () => {
    setPaymentHistory({});
    setPayments({});
    localStorage.removeItem("payments");
    localStorage.removeItem("paymentHistory");
  };

  const handleEditHistory = (participant, index, amount) => {
    const updatedHistory = [...paymentHistory[participant]];
    updatedHistory[index].amount = parseFloat(amount) || 0; // Update the amount
    const newPaymentHistory = { ...paymentHistory, [participant]: updatedHistory };
    setPaymentHistory(newPaymentHistory);
    localStorage.setItem("paymentHistory", JSON.stringify(newPaymentHistory));
  };

  return (
    <StyledContainer maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom color="white">
        Debtor Status
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleResetHistory}
        sx={{ marginBottom: 2 }}
      >
        Reset All History
      </Button>

      <Grid container spacing={2}>
        {participants.map((participant) => (
          <Grid item xs={12} sm={6} key={participant}>
            <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
              <Typography variant="h6" gutterBottom>
                {participant}
              </Typography>
              <Typography variant="body1">
                <strong>Amount Owed: </strong>
                {typeof totalAmounts[participant]?.total === 'number' && !isNaN(totalAmounts[participant]?.total)
                  ? totalAmounts[participant].total.toFixed(2) + " ฿"
                  : "0.00 ฿"}
              </Typography>
              <Typography variant="body1">
                <strong>Amount Paid: </strong>
                {typeof payments[participant] === 'number' && !isNaN(payments[participant])
                  ? payments[participant].toFixed(2) + " ฿"
                  : "0.00 ฿"}
              </Typography>
              <Typography variant="body1">
                <strong>Remaining: </strong>
                {calculateRemaining(participant).toFixed(2)} ฿
              </Typography>
              <Typography variant="body1" color={status[participant] === "Paid" ? "green" : "red"}>
                <strong>Status: </strong>
                {status[participant]}
              </Typography>

              <ResponsiveAccordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Payment History</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {paymentHistory[participant]?.length > 0 ? (
                    paymentHistory[participant].map((payment, index) => (
                      <div key={index}>
                        <Typography>
                          {payment.date}: {typeof payment.amount === 'number' && !isNaN(payment.amount) ? payment.amount.toFixed(2) : "0.00"} ฿
                        </Typography>
                        <TextField
                          type="number"
                          label="Edit Amount"
                          variant="outlined"
                          size="small"
                          onChange={(e) => {
                            const amount = e.target.value;
                            setEditHistory((prev) => ({ ...prev, [`${participant}-${index}`]: amount }));
                          }}
                          sx={{ width: "100%", marginBottom: 1 }}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEditHistory(participant, index, editHistory[`${participant}-${index}`])}
                          size="small"
                        >
                          Edit
                        </Button>
                      </div>
                    ))
                  ) : (
                    <Typography>No history available</Typography>
                  )}
                </AccordionDetails>
              </ResponsiveAccordion>

              <TextField
                type="number"
                label="Payment"
                variant="outlined"
                size="small"
                value={tempPayments[participant] || ""}
                onChange={(e) => handlePaymentChange(participant, e.target.value)}
                sx={{ width: "100%", marginBottom: 1 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSubmitPayment(participant)}
                fullWidth
              >
                Submit Payment
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </StyledContainer>
  );
}
