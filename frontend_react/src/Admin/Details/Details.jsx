import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import { updateRestaurantStatus } from "../../State/Customers/Restaurant/restaurant.action";

const Details = () => {
  const dispatch = useDispatch();

  // Pulling required info from Redux store
  const { auth, restaurant } = useSelector((store) => store);

  // Accessing token from Redux OR localStorage fallback
  const token = auth.jwt || localStorage.getItem("jwt");

  /**
   * Handles toggling restaurant open/close status.
   * Dispatch updates restaurant.open using ID from store.
   */
  const handleStatusToggle = () => {
    dispatch(
      updateRestaurantStatus({
        restaurantId: restaurant.usersRestaurant.id,
        jwt: token,
      })
    );
  };

  // Extract restaurant info for readability
  const currentRestaurant = restaurant.usersRestaurant;

  return (
    <div className="lg:px-20 px-5">

      {/* -------------------- HEADER SECTION -------------------- */}
      <div className="py-5 flex justify-center items-center gap-5">
        <h1 className="text-2xl lg:text-7xl text-center font-bold p-5">
          {currentRestaurant?.name}
        </h1>

        {/* Open / Close Button */}
        <Button
          onClick={handleStatusToggle}
          size="large"
          variant="contained"
          color={currentRestaurant?.open ? "error" : "primary"}
        >
          {currentRestaurant?.open ? "Close" : "Open"}
        </Button>
      </div>

      {/* -------------------- MAIN GRID -------------------- */}
      <Grid container spacing={2}>

        {/* -------- RESTAURANT BASIC DETAILS -------- */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<span className="text-gray-300">Restaurant</span>} />
            <CardContent>
              <div className="space-y-4 text-gray-200">

                <InfoRow label="Owner" value={currentRestaurant?.owner.fullName} />
                <InfoRow label="Restaurant Name" value={currentRestaurant?.name} />
                <InfoRow label="Cuisine Type" value={currentRestaurant?.cuisineType} />
                <InfoRow label="Opening Hours" value={currentRestaurant?.openingHours} />

                {/* Status Pill */}
                <div className="flex">
                  <p className="w-48">Status</p>
                  <div className="text-gray-400">
                    <span className="pr-5">-</span>
                    {currentRestaurant?.open ? (
                      <span className="px-5 py-2 rounded-full bg-green-400 text-gray-950">
                        Open
                      </span>
                    ) : (
                      <span className="px-5 py-2 rounded-full bg-red-400 text-black">
                        Closed
                      </span>
                    )}
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* -------- ADDRESS INFO -------- */}
        <Grid item xs={12} lg={5}>
          <Card>
            <CardHeader title={<span className="text-gray-300">Address</span>} />
            <CardContent>
              <div className="space-y-3 text-gray-200">
                <InfoRow label="Country" value={currentRestaurant?.address.country} />
                <InfoRow label="City" value={currentRestaurant?.address.city} />
                <InfoRow label="Postal Code" value={currentRestaurant?.address.postalCode} />
                <InfoRow label="Street Address" value={currentRestaurant?.address.streetAddress} />
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* -------- CONTACT INFO -------- */}
        <Grid item xs={12} lg={7}>
          <Card>
            <CardHeader title={<span className="text-gray-300">Contact</span>} />
            <CardContent>
              <div className="space-y-3 text-gray-200">

                <InfoRow label="Email" value={currentRestaurant?.contactInformation.email} />
                <InfoRow label="Mobile" value={`+91${currentRestaurant?.contactInformation.mobile}`} />

                {/* Social Links */}
                <div className="flex items-center">
                  <p className="w-48">Social</p>
                  <div className="text-gray-400 flex items-center pb-3">
                    <span className="pr-5">-</span>

                    {/* Using Instagram URL for all socials */}
                    {["instagram", "instagram", "instagram", "instagram"].map((key, index) => (
                      <a
                        key={index}
                        className={`ml-${index === 0 ? "0" : "5"}`}
                        href={currentRestaurant?.contactInformation.instagram}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {index === 0 && <InstagramIcon sx={{ fontSize: "3rem" }} />}
                        {index === 1 && <TwitterIcon sx={{ fontSize: "3rem" }} />}
                        {index === 2 && <LinkedInIcon sx={{ fontSize: "3rem" }} />}
                        {index === 3 && <FacebookIcon sx={{ fontSize: "3rem" }} />}
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </div>
  );
};

export default Details;



/* -----------------------------------------------
   Helper Component for Repeated Row Structure
------------------------------------------------- */
const InfoRow = ({ label, value }) => (
  <div className="flex">
    <p className="w-48">{label}</p>
    <p className="text-gray-400">
      <span className="pr-5">-</span> {value}
    </p>
  </div>
);
