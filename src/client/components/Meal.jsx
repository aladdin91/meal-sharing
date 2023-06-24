import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import img from "../assets/images/food.png";
import {
  Text,
  Image,
  Heading,
  Stack,
  Card,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";

function Meal({ meal }) {
  // console.log(meal);
  return (
    <>
      <Card
        minW="200px"
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={img}
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody>
            {meal.title === null ? (
              <Heading size="md">Title: not available</Heading>
            ) : (
              <Heading size="md">{meal.title}</Heading>
            )}
            {meal.description === null ? (
              <Text py="2">Description: not available</Text>
            ) : (
              <Text py="2">{meal.description}</Text>
            )}
            <Text color="blue.600" fontSize="2xl">
              ${meal.price}
            </Text>
          </CardBody>

          <CardFooter>
            <Link to={`/meal/${meal.id}`}>
              <Button title="Reserve meal" />
            </Link>
          </CardFooter>
        </Stack>
      </Card>
      {/*       
      <div className="meal-card">
        <img className="food-img" src={img} alt="food imege" />
        {meal.title === null ? (
          <h3>Title: not available</h3>
        ) : (
          <h3 className="meal-title">Title: {meal.title}</h3>
        )}
        {meal.description === null ? (
          <p> Description: not available</p>
        ) : (
          <p> Description: {meal.description}</p>
        )}
        {meal.price === null ? (
          <p>Price: not available</p>
        ) : (
          <p>Price: {meal.price} DKK</p>
        )}
        {meal.max_reservation - meal.total_guests <= 0 ? (
          <p> Reservation left: completed</p>
        ) : (
          <p>
            Reservation left:
            {meal.max_reservation - meal.total_guests}
          </p>
        )}
      
      </div> */}
    </>
  );
}

export default Meal;
