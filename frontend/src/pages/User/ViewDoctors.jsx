import UserFooter from "../../components/UserFooter";
import UserNavbar from "../../components/UserNavbar";
import { useLocation, Link } from "react-router-dom";
// import axios from "axios";
import axios from "../../utils/axios/axios";
import { SPECIALIZED_DOCTORS } from "../../utils/axios/consturls";
import { useEffect, useState } from "react";
import {
  Image,
  Box,
  Text,
  Flex,
  Heading,
  Stack,
  Card,
  CardBody,
  VStack,
  StackDivider,
  CardFooter,
  Button,
  Square,
  Center,
} from "@chakra-ui/react";
import HorizontalLine from "../../components/HorizontalLine";
// const image_path = "http://localhost:4000/images/";
const image_path = "https://server.dochere.online/images/";

const ViewDoctors = () => {
  const location = useLocation();
  const id = location.state.specializationId;
  const [doctorDetails, setDoctorDetails] = useState();
  useEffect(() => {
    const getDoctors = async () => {
      // const { data } = await axios.post(
      //   "http://localhost:4000/specialized-doctors",
      //   { id }
      // );
      const { data } = await axios.post(SPECIALIZED_DOCTORS, { id });
      if (data.doctorFound === true) {
        setDoctorDetails(data.doctors);
      } else {
        console.log("no doctor found");
      }
    };

    getDoctors();
  }, []);
  return (
    <>
      <UserNavbar />
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
        textAlign="center"
        padding="5"
      >
        <Text fontSize="25px" color="white" h="40px" background="blue.400">
          Our Doctors
        </Text>
      </VStack>
      <Flex overflowX="hidden" w="100%" h="auto">
        <Box display="flex" flexWrap="wrap" justifyContent="space-between">
          {doctorDetails ? (
            doctorDetails?.map((doctor, i) => {
              return (
                <Flex>
                  <Square size="-moz-fit-content" m={5}>
                    <Card maxW="sm" className="card-footer" key={i}>
                      <CardBody ml={6}>
                        <Link to="/book-appointment" state={doctor}>
                          <Image
                            src={
                              doctor?.profilePicture
                                ? image_path + doctor.profilePicture
                                : "https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?size=626&ext=jpg"
                            }
                            alt="doctor image"
                            borderRadius="lg"
                          />
                        </Link>

                        <Stack mt="6" spacing="3" ml="6">
                          <Heading size="md">{doctor.name}</Heading>
                          <Text>{doctor.specialization}</Text>
                        </Stack>
                      </CardBody>
                    </Card>
                  </Square>
                </Flex>
              );
            })
          ) : (
            <div className="flex justify-center items-center h-screen ml-52">
              <div className="text-center">
                <h1 className="text-4xl font-bold ml-96">No Doctors Found</h1>
              </div>
            </div>
          )}
        </Box>
      </Flex>
      <div className="flex justify-center">
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          <Box h="-moz-max-content">
            <Stack spacing={3}>
              <Text fontSize="50px" color="black">
                Make sessions from the <br />{" "}
                <p className="text-blue-500">comfort of your home</p>
              </Text>
              <Text fontSize="md">
                we ensures to provide the highest quality of care and a
                transformative experience <br /> for all your healthcare needs.
                Our multi-specialty care equipped with <br /> specialised
                doctors, and bring global standards of medical care to our
                patients.
              </Text>
            </Stack>
          </Box>
        </VStack>
      </div>

      <HorizontalLine />
      <UserFooter />
    </>
  );
};

export default ViewDoctors;
