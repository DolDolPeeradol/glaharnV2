import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid,
  Paper,
  Chip,
  Box,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import PersonIcon from "@mui/icons-material/Person";
import { useSnackbar } from "notistack";
import { v4 as uuidv4 } from "uuid"; // For unique IDs
import Autocomplete from "@mui/material/Autocomplete";

const loadFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  const parsedData = data ? JSON.parse(data) : [];

  // Ensure that parsedData is an array
  return Array.isArray(parsedData) ? parsedData : [];
};

const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const CheckBill = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [participants, setParticipants] = useState(
    loadFromLocalStorage("participants")
  );
  const [participantName, setParticipantName] = useState("");
  const [foodItems, setFoodItems] = useState(
    loadFromLocalStorage("foodItems") || []
  );
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [selectedParticipants, setSelectedParticipants] = useState({});
  const [editingFoodId, setEditingFoodId] = useState(null);

  useEffect(() => {
    saveToLocalStorage("participants", participants);
    saveToLocalStorage("foodItems", foodItems);
  }, [participants, foodItems]);

  const handleAddParticipant = () => {
    if (
      participantName.trim() &&
      !participants.includes(participantName.trim())
    ) {
      setParticipants([...participants, participantName.trim()]);
      setParticipantName("");
      enqueueSnackbar("Participant added!", { variant: "success" });
    } else {
      enqueueSnackbar("Participant name is empty or already exists.", {
        variant: "error",
      });
    }
  };

  const handleRemoveParticipant = (index) => {
    setParticipants(participants.filter((_, i) => i !== index));
    enqueueSnackbar("Participant removed!", { variant: "warning" });
  };

  const handleResetParticipants = () => {
    setParticipants([]);
    enqueueSnackbar("All participants reset!", { variant: "info" });
  };

  const handleResetFoodItems = () => {
    setFoodItems([]);
    enqueueSnackbar("All food items reset!", { variant: "info" });
  };

  const handleResetAllData = () => {
    handleResetParticipants();
    handleResetFoodItems();
    enqueueSnackbar("All data has been reset!", { variant: "info" });
  };

  const exampleFoodItems = [
    "เบียร์",
    "เบียร์ (โปร)",
    "เหล้า",
    "เหล้า (โปร)",
    "น้ำแข็ง",
    "น้ำเปล่า",
    "น้ำอัดลม",
    "เหล้าปั่น",
    "mixer",
    "ข้าวผัด",
    "ลูกชิ้น",
    "ขนม",
    "ข้าวผัดกะเพรา",
    "ยำ",
    "กุ้งแช่น้ำปลา",
    "เอ็นไก่ทอด",
    "คอหมูย่าง",
    "ส้มตำ",
    "ข้าวสวย",
    "ข้าวเหนียว",
    "ขนมจีน",
    "ซุปมิโซะ",
    "สเต๊กหมู",
    "ไส้กรอก",
    "ทาโก้",
    "ทอดมันปลา",
    "ปีกไก่ทอด",
    "ไข่เจียว",
    "สลัดผัก",
    "ผัดซีอิ๊ว",
    "ข้าวเหนียวมะม่วง",
    "น้ำตาล",
    "น้ำจิ้มแจ่ว",
    "ข้าวแกง",
    "ผัดกะเพราเนื้อ",
    "ก๋วยเตี๋ยว",
    "น้ำมะพร้าว",
    "ชานมไข่มุก",
    "น้ำสมุนไพร",
    "ขนมหวานไทย",
    "ปลาเผา",
    "ปอเปี๊ยะ",
    "ลาบ",
    "ต้มยำ",
    "ข้าวมันไก่",
    "บะหมี่",
    "เค้ก",
    "ไอศกรีม",
    "น้ำแตงโม",
    "น้ำสับปะรด",
    "น้ำฝรั่ง",
    "น้ำทับทิม",
    "บราวนี่",
    "ขนมปังปิ้ง",
    "แกงส้ม",
    "ขนมกุ้ยช่าย",
    "หมูปิ้ง",
    "กุ้งทอด",
    "ซี่โครงหมู",
    "ข้าวคลุกกะปิ",
    "ข้าวกระเพราไก่",
    "แกงเขียวหวาน",
    "แหนม",
    "ขนมไข่",
    "หมูทอด",
    "ปลาทอด",
    "ข้าวซอย",
    "น้ำผึ้ง",
    "น้ำเก๊กฮวย",
    "น้ำกระเจี๊ยบ",
    "น้ำเงี้ยว",
    "น้ำฟักทอง",
    "น้ำมะนาว",
    "บิงซู",
    "ชูว์",
    "มาม่าผัด",
    "ปีกนก",
    "ปอเปี๊ยะทอด",
    "สตูว์เนื้อ",
    "ถั่วลิสง",
    "นมสด",
    "กาแฟ",
    "น้ำผลไม้ปั่น",
    "น้ำสมูทตี้",
    "น้ำบีทรูท",
    "น้ำมะละกอ",
    "ขนมเบื้อง",
    "โซดา",
    "มาร์การิต้า",
    "ค็อกเทล",
    "ไวน์",
    "สก็อตช์",
    "รัม",
    "จิน",
    "มอสโคว์มูด",
    "ช็อต",
    "เหล้าบรั่นดี",
    "สลัดทูน่า",
    "ปีกไก่บาร์บีคิว",
    "สเต๊กเนื้อ",
    "ฟิชแอนด์ชิปส์",
    "อาหารทะเลย่าง",
    "ยำวุ้นเส้น",
    "ข้าวคลุกกะปิ",
    "ซุปกระดูกหมู",
    "ส้มตำไทย",
    "ซี่โครง BBQ",
    "เส้นหมี่",
    "ก๋วยเตี๋ยวเรือ",
    "ข้าวห่อไข่",
    "ไข่เค็ม",
    "หมูกรอบ",
    "หอยทอด",
    "ข้าวมันไก่ทอด",
    "ปีกไก่ย่าง",
    "ข้าวแกงกะหรี่",
    "ขนมโตเกียว",
    "ผัดผักรวม",
    "ส้มตำปู",
    "ปูม้า",
    "ต้มจืด",
    "แกงเผ็ด",
    "ยำหมูยอ",
    "พริกสด",
    "น้ำผักผลไม้",
    "น้ำองุ่น",
    "น้ำมะนาวโซดา",
    "ออส่วน",
    "ข้าวเกรียบ",
    "ขนมชั้น",
    "ข้าวซอยเนื้อ",
    "น้ำมะม่วง",
    "ปีกไก่ทอดน้ำปลา",
    "แกงไก่",
    "กุ้งทอดกระเทียม",
    "ขนมจีนน้ำยาปู",
    "ข้าวต้ม",
    "ขนมปังหน้าไก่",
    "น้ำพั้นช์",
    "ห่อหมก",
    "น้ำจิ้มซีฟู้ด",
    "เกี๊ยวซ่า",
    "ผัดกระเพราเห็ด",
    "ปลาหมึกย่าง",
    "กะเพราไข่ดาว",
    "ข้าวผัดต้มยำ",
    "ขนมเกสร",
    "ซุปเห็ด",
    "หมูย่าง",
    "เส้นหมี่อบ",
    "หมี่กรอบ",
    "ข้าวไข่ข้น",
    "น้ำลูกเดือย",
    "น้ำส้ม",
    "น้ำมะพร้าวปั่น",
    "ชามะนาว",
    "ขนมช็อกโกแลต",
    "พิซซ่า",
    "ข้าวกะเพรา",
    "หมูสเต๊ะ",
    "ข้าวมันส้มตำ",
  ];

  const handleAddFoodItem = () => {
    const price = parseFloat(foodPrice);
    const trimmedFoodName = foodName.trim();
    const selectedParticipantNames = Object.keys(selectedParticipants).filter(
      (name) => selectedParticipants[name]
    );

    // ตรวจสอบว่าราคาเป็นบวก
    if (isNaN(price) || price <= 0) {
      enqueueSnackbar("Please enter a valid positive price.", {
        variant: "error",
      });
      return;
    }

    // ตรวจสอบว่าได้กรอก food name
    if (!trimmedFoodName) {
      enqueueSnackbar("Please enter a food name.", {
        variant: "error",
      });
      return;
    }

    // ตรวจสอบว่ามีการเลือก participant อย่างน้อยหนึ่งคน
    if (selectedParticipantNames.length === 0) {
      enqueueSnackbar("Please select at least one participant.", {
        variant: "error",
      });
      return;
    }

    // ตรวจสอบชื่ออาหารว่าซ้ำหรือไม่ (ยกเว้นถ้ากำลังแก้ไข)
    if (
      !editingFoodId &&
      foodItems.some((food) => food.name === trimmedFoodName)
    ) {
      enqueueSnackbar(
        "Food name already exists. Please enter a different name.",
        { variant: "error" }
      );
      return;
    }

    const newFoodItem = {
      id: editingFoodId || uuidv4(), // ใช้ id เดิมถ้ากำลังแก้ไข
      name: trimmedFoodName,
      price: price,
      participants: selectedParticipantNames,
      splitPrice: (price / selectedParticipantNames.length).toFixed(2),
    };

    if (editingFoodId) {
      const updatedFoodItems = foodItems.map((food) => {
        if (food.id === editingFoodId) {
          return newFoodItem; // แทนที่รายการอาหารที่มีอยู่ด้วยรายละเอียดใหม่
        }
        return food; // เก็บรายการอาหารอื่น ๆ ที่ไม่เปลี่ยนแปลง
      });
      setFoodItems(updatedFoodItems);
      enqueueSnackbar("Food item updated!", { variant: "success" });
    } else {
      setFoodItems([...foodItems, newFoodItem]); // เพิ่มรายการอาหารใหม่
      enqueueSnackbar("Food item added!", { variant: "success" });
    }

    resetFoodInputs(); // รีเซ็ต input หลังจากการเพิ่มหรืออัปเดต
  };

  const resetFoodInputs = () => {
    setFoodName(""); // Reset foodName to empty string
    setFoodPrice(""); // Reset foodPrice to empty string
    setSelectedParticipants({}); // Reset selected participants
    setEditingFoodId(null); // Clear editing ID
  };

  const handleEditFoodItem = (food) => {
    setFoodName(food.name);
    setFoodPrice(food.price);
    setSelectedParticipants(
      participants.reduce((acc, participant) => {
        acc[participant] = food.participants.includes(participant);
        return acc;
      }, {})
    );
    setEditingFoodId(food.id);
  };

  const handleUpdateFoodItem = () => {
    if (editingFoodId) {
      const updatedFoodItems = foodItems.map((food) => {
        if (food.id === editingFoodId) {
          const splitPrice = (
            parseFloat(foodPrice) / Object.keys(selectedParticipants).length
          ).toFixed(2);
          return {
            ...food,
            name: foodName,
            price: parseFloat(foodPrice),
            participants: Object.keys(selectedParticipants),
            splitPrice,
          };
        }
        return food;
      });

      setFoodItems(updatedFoodItems);
      resetFoodInputs();
      enqueueSnackbar("Food item updated!", { variant: "success" });
    }
  };

  const handleRemoveFoodItem = (id) => {
    setFoodItems(foodItems.filter((item) => item.id !== id));
    enqueueSnackbar("Food item removed!", { variant: "warning" });
  };

  const handleSelectParticipant = (name) => {
    setSelectedParticipants((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const totalSummary = foodItems.reduce((acc, food) => {
    food.participants.forEach((participant) => {
      acc[participant] = (acc[participant] || 0) + parseFloat(food.splitPrice);
    });
    return acc;
  }, {});

  return (
    <Box
      p={3}
      sx={{ backgroundColor: "#f9f9f9", borderRadius: 2, boxShadow: 3 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h4" align="center" gutterBottom color="primary">
          Check Bill
        </Typography>
      </motion.div>

      {/* Add Participants Section */}
      <Paper elevation={3} sx={{ p: 2, mb: 3, borderRadius: 2, boxShadow: 5 }}>
        <Typography variant="h6" sx={{ mb: 2 }} color="secondary">
          <PersonIcon /> Add Participants
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              label="Participant Name"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.12)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "purple",
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddParticipant}
              startIcon={<AddIcon />}
              fullWidth
              sx={{
                transition: "0.3s",
                "&:hover": {
                  backgroundColor: "blue",
                },
              }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          {participants.map((name, index) => (
            <Chip
              key={index}
              label={name}
              sx={{
                m: 0.5,
                backgroundColor: "#336699",
                color: "white",
                "&:hover": {
                  backgroundColor: "#336699",
                },
              }}
              onDelete={() => handleRemoveParticipant(index)}
            />
          ))}
        </Box>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleResetParticipants}
          fullWidth
        >
          Reset All Participants
        </Button>
      </Paper>

      {/* Add Food Items Section */}
      <Paper elevation={3} sx={{ p: 2, mb: 3, borderRadius: 2, boxShadow: 5 }}>
        <Typography variant="h6" sx={{ mb: 2 }} color="secondary">
          <RestaurantMenuIcon /> Add Food Items
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <Autocomplete
              options={exampleFoodItems}
              freeSolo
              onChange={(event, newValue) => setFoodName(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Food Name"
                  variant="outlined"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(0, 0, 0, 0.12)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(0, 0, 0, 0.5)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "purple",
                      },
                    },
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Food Price"
              type="number"
              value={foodPrice}
              onChange={(e) => setFoodPrice(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.12)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(0, 0, 0, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "purple",
                  },
                },
              }}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Select Participants:</Typography>
          <Grid container spacing={1}>
            {participants.map((name) => (
              <Grid item key={name} xs={6}>
                <Button
                  variant="outlined"
                  color={selectedParticipants[name] ? "primary" : "default"}
                  onClick={() => handleSelectParticipant(name)}
                  fullWidth
                  sx={{
                    transition: "0.3s",
                    borderColor: selectedParticipants[name]
                      ? "purple"
                      : "rgba(0, 0, 0, 0.12)",
                    backgroundColor: selectedParticipants[name]
                      ? "#336699"
                      : "transparent",
                    color: selectedParticipants[name]
                      ? "white"
                      : "black",
                    "&:hover": {
                      backgroundColor: selectedParticipants[name]
                        ? "#336699"
                        : "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                 {name}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddFoodItem}
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: "blue",
            "&:hover": {
              backgroundColor: "blue",
            },
          }}
        >
          {editingFoodId ? "Update Food Item" : "Add Food Item"}
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleResetFoodItems}
          fullWidth
          sx={{ mt: 2 }}
        >
          Reset All Food Items
        </Button>
      </Paper>

      {/* List of Food Items */}
      <List sx={{ mb: 3 }}>
        {foodItems.map((food) => (
          <ListItem
            key={food.id}
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.12)",
              borderRadius: 2,
              mb: 2,
              p: 2,
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {food.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {food.participants.join(", ")}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1">
                  {food.price.toFixed(2)} ฿
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" color="primary">
                  {food.splitPrice} ฿ each
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  color="secondary"
                  onClick={() => handleEditFoodItem(food)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleRemoveFoodItem(food.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>

      {/* Total Summary */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }} color="secondary">
          Total Summary
        </Typography>
        {Object.keys(totalSummary).map((participant) => (
          <Typography key={participant} variant="body1">
            {participant}: {totalSummary[participant].toFixed(2)} ฿
          </Typography>
        ))}
      </Box>

      {/* Reset and Summary Buttons */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleResetAllData}
            fullWidth
            sx={{ fontSize: "0.8rem", height: 50 }}
          >
            Reset All Data
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ fontSize: "1rem", height: 50 }}
            onClick={() => (window.location.href = "/summary")} // Assume summary page route
          >
            Make Slip Summary
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckBill;
