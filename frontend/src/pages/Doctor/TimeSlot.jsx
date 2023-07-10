import DoctorNavbar from "../../components/DoctorNavbar";
import React, { useState } from "react";
// import axios from "axios";
import { doctorInstance } from "../../utils/axios/axios";
import { DOCTOR_SELECT_SLOTS } from "../../utils/axios/consturls";
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { LoginSocialGoogle } from "reactjs-social-login";
import { ToastContainer, toast } from "react-toastify";
import {
  Box,
  VStack,
  Text,
  Checkbox,
  Badge,
  Button,
  Flex,
} from "@chakra-ui/react";
import { DatePicker } from "antd";
const availableTimings = [
  { time: "10:00 AM" },
  { time: "12:00 PM" },
  { time: "2:00 PM" },
  { time: "4:00 PM" },
  { time: "6:00 PM" },
  { time: "8:00 PM" },
];

const TimeSlot = () => {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const doctor = cookie.get("doctorToken");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimings, setSelectedTimings] = useState([]);

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date.toISOString().slice(0, 10));
    }
  };
  const handleTimingSelection = (timing) => {
    const index = selectedTimings.indexOf(timing);
    if (index === -1) {
      setSelectedTimings([...selectedTimings, timing]);
    } else {
      setSelectedTimings(selectedTimings.filter((t) => t !== timing));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedDate === null) {
      toast.warn("Choose Date", {
        autoClose: 2000,
        theme: "dark",
      });
    }
    if (!selectedTimings.length) {
      toast.warn("Select Time Slots", {
        autoClose: 2000,
        theme: "dark",
      });
    }
    try {
      const decode = jwtDecode(doctor);
      let id = decode.id;
      const body = {
        selectedDate,
        selectedTimings,
        id,
      };
      const { data } = await doctorInstance.post(
        DOCTOR_SELECT_SLOTS,
        body
      );
      if (data.slotsAdded === true) {
        toast.success("Slots updated successfully", {
          autoClose: 2000,
          theme: "dark",
        });
        setTimeout(() => {
          navigate("/doctor");
        }, 1000);
      } else {
        toast.error("Failed to update time slots", {
          autoClose: 2000,
          theme: "dark",
        });
      }
    } catch (err) {
      navigate("*");
    }
  };
  return (
    <>
      <DoctorNavbar />
      <Box
        p={{ base: "4", md: "6" }}
        bg="gray.100"
        ml={{ base: "0", md: "24" }}
        mt={{ base: "0", md: "24" }}
        maxW="1400px"
        borderWidth="1px"
        borderColor="gray.200"
        rounded="lg"
        shadow="md"
        _hover={{ bg: "blue.50" }}
        dark={{
          bg: "gray.800",
          borderWidth: "1px",
          borderColor: "gray.700",
          _hover: { bg: "gray.700" },
        }}
      >
        <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="medium">
          Select Date:
        </Text>
        <Box mt={3}>
          <DatePicker
            onChange={handleDateChange}
            disabledDate={(currentDate) => {
              // disable dates before today
              if (currentDate && currentDate < moment().startOf("day")) {
                return true;
              }
              // disable dates more than 30 days in the future
              if (currentDate && currentDate > moment().add(30, "days")) {
                return true;
              }
              return false;
            }}
          />
        </Box>
        <VStack align="stretch" spacing={4} mt={9}>
          <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="medium">
            Select Time:
          </Text>
          <Flex wrap="wrap">
            {availableTimings.map((timing) => (
              <Checkbox
                paddingLeft={{ base: 2, md: 28 }}
                key={timing.time}
                isChecked={selectedTimings.includes(timing)}
                onChange={() => handleTimingSelection(timing)}
              >
                {timing.time}
              </Checkbox>
            ))}
          </Flex>
          <Flex justify="center">
            <Button
              mt={6}
              colorScheme="blue"
              size={{ base: "sm", md: "md" }}
              disabled={selectedTimings.length === 0}
              onClick={handleSubmit}
            >
              Submit Timings
            </Button>
          </Flex>
          <Flex mt={4}>
            {selectedTimings.length > 0 ? (
              selectedTimings.map((timing) => (
                <Box key={timing.time} mr={{ base: 2, md: 12 }}>
                  <Badge colorScheme="green">{timing.time}</Badge>
                </Box>
              ))
            ) : (
              <Text fontStyle="italic ">
                Please select one or more available appointment timings.
              </Text>
            )}
          </Flex>
        </VStack>
      </Box>
      <ToastContainer />
    </>
  );
};

export default TimeSlot;
