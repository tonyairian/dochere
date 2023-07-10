import React, { useState, useEffect } from "react";
import DoctorNavbar from "../../components/DoctorNavbar";
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";
import { doctorInstance } from "../../utils/axios/axios";
import { DOCTOR_DETAILS } from "../../utils/axios/consturls";
import { useNavigate } from "react-router-dom";

import {
  Badge,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
const image_path = "http://localhost:4000/images/";
const DoctorProfile = () => {
  const cookie = new Cookies();
  const doctor = cookie.get("doctorToken");
  const decode = jwtDecode(doctor);
  const doctorId = decode.id;
  const navigate = useNavigate();
  const [doctorDetails, setDoctorDetails] = useState([]);
  const image = doctorDetails.profilePicture;
  useEffect(() => {
    const getDoctorProfile = async () => {
      const { data } = await doctorInstance.post(DOCTOR_DETAILS, { doctorId });
      setDoctorDetails(data.doctorData);
    };
    getDoctorProfile();
  }, []);
  const editProfile = async () => {
    navigate("/doctor/edit-profile", { state: doctorDetails });
  };
  return (
    <>
      <DoctorNavbar />
      <Center py={40}>
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          w={{ sm: "100%", md: "540px" }}
          height={{ sm: "476px", md: "20rem" }}
          direction={{ base: "column", md: "row" }}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          padding={4}
        >
          <Flex flex={1} bg="blue.200">
            <Image
              objectFit="cover"
              boxSize="100%"
              // src={
              //   "https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
              // }
              src={image_path + image}
            />
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}
          >
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              {doctorDetails.name}
            </Heading>
            <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
              {doctorDetails.email}
            </Text>

            <Stack align={"center"} justify={"center"} direction={"row"} mt={3}>
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue("gray.50", "gray.800")}
                fontWeight={"800"}
              >
                {doctorDetails.specialization}
              </Badge>
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue("gray.50", "gray.800")}
                fontWeight={"800"}
              >
                {doctorDetails.number}
              </Badge>
              <Badge
                px={2}
                py={1}
                bg={useColorModeValue("gray.50", "gray.800")}
                fontWeight={"800"}
              >
                {doctorDetails.experience}
              </Badge>
            </Stack>
            <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
              <Text
                px={2}
                py={1}
                bg={useColorModeValue("gray.50", "gray.800")}
                fontWeight={"400"}
              >
                Reg No: {doctorDetails.regNumber}
              </Text>
            </Stack>

            <Stack
              width={"100%"}
              mt={"2rem"}
              direction={"row"}
              padding={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Button
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                bg={"blue.400"}
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "blue.500",
                }}
                _focus={{
                  bg: "blue.500",
                }}
                onClick={editProfile}
              >
                Edit Profile
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Center>
    </>
  );
};

export default DoctorProfile;
