import React, { useState } from "react";
import UserNavbar from "../../components/UserNavbar";
// import axios from "axios";
import axios from "../../utils/axios/axios";
import { CHECK_AVAILABILITY, CONFIRM_SLOT } from "../../utils/axios/consturls";
import moment from "moment";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import UserFooter from "../../components/UserFooter";
import HorizontalLine from "../../components/HorizontalLine";
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Image,
  Text,
  Button,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { DatePicker } from "antd";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const image_path = "http://localhost:4000/images/";
export const Booking = () => {
  const navigate = useNavigate();
  const [timeSlot, SetTimeSlot] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState([]);
  const [bookingDate, setBookingDate] = useState("");
  const cookie = new Cookies();
  const user = cookie.get("userToken");
  const location = useLocation();
  const { name, _id, experience, specialization, profilePicture } =
    location.state;

  const handleDateChange = async (date) => {
    if (date) {
      var isoDateString = date.toISOString().split("T")[0];
    }
    setBookingDate(isoDateString);
    const details = {
      doctorId: _id,
      date: isoDateString,
    };

    try {
      const { data } = await axios.post(CHECK_AVAILABILITY, details);
      if (data) {
        if (data.slotsFound) {
          SetTimeSlot(data.slots);
        } else {
          SetTimeSlot([]);
        }
      }
    } catch (err) {
      navigate("*");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const decode = jwtDecode(user);
    let id = decode.id;
    const bookingDetails = {
      doctorId: _id,
      slot: selectedSlot,
      userId: id,
      date: bookingDate,
      fee: 500,
    };
    if (selectedSlot.length === 0) {
      toast.success("Select a slot", {
        autoClose: 2000,
        theme: "dark",
      });
    } else {
      try {
        const { data } = await axios.post(CONFIRM_SLOT, bookingDetails);

        if (data.doctor && data.doctor) {
          navigate("/confirm-booking", {
            state: { data: data, bookingDetails: bookingDetails },
          });
        } else {
          alert("something went wrong");
        }
      } catch (error) {
        navigate("*");
      }
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="flex items-center justify-center mt-10">
        <Card
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            // src="https://res.cloudinary.com/dxzfgrp4k/image/upload/v1684216242/obmy1chjmmk1r6mwk5uh.webp"
            src={
              profilePicture
                ? image_path + profilePicture
                : "https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=626&ext=jpg"
            }
            alt="Caffe Latte"
          />

          <Stack mt="6" spacing="3">
            <CardBody>
              <Heading size="md">{name}</Heading>

              <Text py="2">
                {`He is a ${specialization} with ${experience} of experience.
        Here you can check his avalibility`}
              </Text>

              <Text color="blue.600" fontSize="xl">
                Consultation Fee:500
              </Text>
              <br />
              <Text>
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
              </Text>
              <br />
              {/* <Text>Time:</Text> */}

              {timeSlot.length ? (
                timeSlot.map((time, i) => {
                  return (
                    <Button
                      className="booingBtn"
                      colorScheme="blue"
                      variant="outline"
                      margin={2}
                      onClick={(e) => setSelectedSlot(time)}
                      key={i}
                    >
                      {time}
                    </Button>
                  );
                })
              ) : (
                <></>
              )}
            </CardBody>

            <CardFooter>
              {timeSlot.length ? (
                <Button
                  variant="solid"
                  colorScheme="blue"
                  onClick={(e) => handleSubmit(e)}
                >
                  Book Appoinment
                </Button>
              ) : (
                <Text className="text-red-600 text-sm">
                  Doctor is not avaliable on this day
                </Text>
              )}
            </CardFooter>
          </Stack>
        </Card>
      </div>
      <HorizontalLine />
      <ToastContainer />
      {/* <UserFooter/> */}
    </>
  );
};
