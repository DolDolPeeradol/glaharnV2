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
import { useNavigate } from "react-router-dom";

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
  const [editHistory, setEditHistory] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedParticipants =
      JSON.parse(localStorage.getItem("participants")) || [];
    const storedTotalAmounts =
      JSON.parse(localStorage.getItem("totalAmounts")) || {};
    const storedPayments = JSON.parse(localStorage.getItem("payments")) || {};
    const storedHistory =
      JSON.parse(localStorage.getItem("paymentHistory")) || {};

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
    const parsedAmount = parseFloat(amount);
    if (parsedAmount < 0) {
      alert("Please enter a positive amount.");
      return;
    }

    const updatedTempPayments = {
      ...tempPayments,
      [participant]: parsedAmount || "",
    };
    setTempPayments(updatedTempPayments);
  };

  const handleSubmitPayment = (participant) => {
    const paymentAmount = parseFloat(tempPayments[participant]) || 0;

    // ทำการอัปเดตสถานะการชำระเงิน
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
        [participant]:
            updatedPayments[participant] >= (totalAmounts[participant]?.total || 0)
                ? "Paid"
                : "Pending",
    }));

    // ทำให้ช่องกรอกเงินว่าง
    setTempPayments((prev) => ({ ...prev, [participant]: "" })); // ตั้งค่าให้ช่องกรอกเงินเป็นค่าว่าง
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

    const resetStatus = {};
    participants.forEach((participant) => {
      resetStatus[participant] = "Pending";
    });
    setStatus(resetStatus);
  };

  const handleEditHistory = (participant, index, amount) => {
    const parsedAmount = parseFloat(amount);
    if (parsedAmount <= 0) {
      alert("Please enter a positive amount.");
      return;
    }

    const updatedHistory = [...paymentHistory[participant]];
    const previousAmount = updatedHistory[index].amount;
    updatedHistory[index].amount = parsedAmount;

    const newPaymentHistory = {
      ...paymentHistory,
      [participant]: updatedHistory,
    };
    setPaymentHistory(newPaymentHistory);
    localStorage.setItem("paymentHistory", JSON.stringify(newPaymentHistory));

    const updatedPayment = (payments[participant] || 0) - previousAmount + parsedAmount;
    const updatedPayments = {
      ...payments,
      [participant]: updatedPayment,
    };
    setPayments(updatedPayments);
    localStorage.setItem("payments", JSON.stringify(updatedPayments));

    setStatus((prevStatus) => ({
      ...prevStatus,
      [participant]:
        updatedPayments[participant] >= (totalAmounts[participant]?.total || 0)
          ? "Paid"
          : "Pending",
    }));
  };

  return (
    <StyledContainer maxWidth="md">
      {participants.length === 0 || Object.keys(totalAmounts).length === 0 ? (
        <div style={{ textAlign: "center" }}>
          <Typography variant="h5" align="center" color="error" gutterBottom>
            Please fill out the Summary information first.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/summary")} // Go to Summary.js
          >
            Go to Summary
          </Button>
        </div>
      ) : (
        <>
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
                    {typeof totalAmounts[participant]?.total === "number" &&
                    !isNaN(totalAmounts[participant]?.total)
                      ? totalAmounts[participant].total.toFixed(2) + " ฿"
                      : "0.00 ฿"}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Amount Paid: </strong>
                    {typeof payments[participant] === "number" &&
                    !isNaN(payments[participant])
                      ? payments[participant].toFixed(2) + " ฿"
                      : "0.00 ฿"}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Remaining: </strong>
                    {calculateRemaining(participant).toFixed(2)} ฿
                  </Typography>
                  <Typography
                    variant="body1"
                    color={status[participant] === "Paid" ? "green" : "red"}
                  >
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
                              {payment.date}:{" "}
                              {typeof payment.amount === "number" &&
                              !isNaN(payment.amount)
                                ? payment.amount.toFixed(2)
                                : "0.00"}{" "}
                              ฿
                            </Typography>
                            <TextField
                              type="number"
                              label="Edit Amount"
                              variant="outlined"
                              size="small"
                              onChange={(e) => {
                                const amount = e.target.value;
                                setEditHistory((prev) => ({
                                  ...prev,
                                  [`${participant}-${index}`]: amount,
                                }));
                              }}
                              sx={{ width: "100%", marginBottom: 1 }}
                            />
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() =>
                                handleEditHistory(
                                  participant,
                                  index,
                                  editHistory[`${participant}-${index}`]
                                )
                              }
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
                    onChange={(e) => handlePaymentChange(participant, e.target.value)}
                    sx={{ width: "100%", marginBottom: 1 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSubmitPayment(participant)}
                  >
                    Submit Payment
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </StyledContainer>
  );
}
