import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Backdrop,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import MenuItemCard from "../../components/MenuItem/MenuItemCard";
import { useDispatch, useSelector } from "react-redux";

import {
  getRestaurantById,
  getRestaurantsCategory,
  getRestaurantReviews,
  createReview,
} from "../../../State/Customers/Restaurant/restaurant.action";

import { getMenuItemsByRestaurantId } from "../../../State/Customers/Menu/menu.action";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import TodayIcon from "@mui/icons-material/Today";

const foodTypes = [
  { label: "All", value: "all" },
  { label: "Vegetarian Only", value: "vegetarian" },
  { label: "Non-Vegetarian Only", value: "non_vegetarian" },
  { label: "Seasonal", value: "seasonal" },
];

const Restaurant = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const { restaurant, menu } = useSelector((store) => store);

  const jwt = localStorage.getItem("jwt");

  // -------------------------
  // ⭐ Review Form State
  // -------------------------
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmitReview = () => {
    if (!jwt) {
      navigate("/account/login");
      return;
    }

    dispatch(
      createReview({
        restaurantId: id,
        rating,
        comment,
        jwt,
      })
    );

    setRating(5);
    setComment("");
  };

  // -------------------------
  // URL Query Filters
  // -------------------------
  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);

  const foodType = searchParams.get("food_type");
  const foodCategory = searchParams.get("food_category");

  useEffect(() => {
    dispatch(
      getRestaurantById({
        jwt,
        restaurantId: id,
      })
    );

    dispatch(
      getMenuItemsByRestaurantId({
        jwt,
        restaurantId: id,
        seasonal: foodType === "seasonal",
        vegetarian: foodType === "vegetarian",
        nonveg: foodType === "non_vegetarian",
        foodCategory: foodCategory || "",
      })
    );

    dispatch(getRestaurantsCategory({ restaurantId: id, jwt }));

    dispatch(
      getRestaurantReviews({
        restaurantId: id,
        jwt,
      })
    );
  }, [id, foodType, foodCategory, dispatch, jwt]);

  const handleFilter = (e, value) => {
    const params = new URLSearchParams(location.search);

    if (value === "all") {
      params.delete(e.target.name);
      params.delete("food_category");
    } else {
      params.set(e.target.name, e.target.value);
    }

    navigate({ search: `?${params.toString()}` });
  };

  return (
    <>
      <div className="px-5 lg:px-20 ">
        {/* ---------------- HEADER SECTION ---------------- */}
        <section>
          <h3 className="text-gray-500 py-2 mt-10">
            Home/{restaurant.restaurant?.address?.country}/
            {restaurant.restaurant?.name}/{restaurant.restaurant?.id}/Order
            Online
          </h3>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <img
                className="w-full h-[40vh] object-cover"
                src={restaurant.restaurant?.images?.[0]}
                alt=""
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <img
                className="w-full h-[40vh] object-cover"
                src={restaurant.restaurant?.images?.[1]}
                alt=""
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <img
                className="w-full h-[40vh] object-cover"
                src={restaurant.restaurant?.images?.[2]}
                alt=""
              />
            </Grid>
          </Grid>

          <div className="pt-3 pb-5">
            <h1 className="text-4xl font-semibold">
              {restaurant.restaurant?.name}
            </h1>

            <p className="text-gray-500 mt-1">
              {restaurant.restaurant?.description}
            </p>

            <div className="space-y-3 mt-3">
              <p className="text-gray-500 flex items-center gap-3">
                <LocationOnIcon />{" "}
                <span>{restaurant.restaurant?.address?.streetAddress}</span>
              </p>

              <p className="flex items-center gap-3 text-gray-500">
                <TodayIcon />{" "}
                <span className=" text-orange-300">
                  {restaurant.restaurant?.openingHours} (Today)
                </span>
              </p>
            </div>
          </div>
        </section>

        <Divider />

        {/* ---------------- MENU + FILTERS ---------------- */}
        <section className="pt-[2rem] lg:flex relative ">
          {/* FILTERS */}
          <div className="space-y-10 lg:w-[20%] filter">
            <div className="box space-y-5 lg:sticky top-28">
              <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
                Food Type
              </Typography>

              <FormControl className="py-10 space-y-5" component="fieldset">
                <RadioGroup
                  name="food_type"
                  value={foodType || "all"}
                  onChange={handleFilter}
                >
                  {foodTypes.map((item) => (
                    <FormControlLabel
                      key={item.value}
                      value={item.value}
                      control={<Radio />}
                      label={item.label}
                      sx={{ color: "gray" }}
                    />
                  ))}
                </RadioGroup>

                <Divider />

                <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
                  Food Category
                </Typography>

                <RadioGroup
                  name="food_category"
                  value={foodCategory || "all"}
                  onChange={handleFilter}
                >
                  <FormControlLabel
                    value={"all"}
                    control={<Radio />}
                    label={"All"}
                    sx={{ color: "gray" }}
                  />

                  {restaurant.categories?.map((item) => (
                    <FormControlLabel
                      key={item.name}
                      value={item.name}
                      control={<Radio />}
                      label={item.name}
                      sx={{ color: "gray" }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>

          {/* MENU ITEMS + REVIEWS */}
          <div className="lg:w-[80%] space-y-5 lg:pl-10">
            {menu?.menuItems?.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}

            {/* ---------------- REVIEWS SECTION ---------------- */}
            <section className="mt-10">
              <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>

              {restaurant.reviewsLoading && (
                <p className="text-gray-500">Loading reviews...</p>
              )}

              {!restaurant.reviewsLoading &&
                restaurant.reviews?.length === 0 && (
                  <p className="text-gray-500">
                    No reviews yet. Be the first to review!
                  </p>
                )}

              <div className="space-y-4 mb-8">
                {restaurant.reviews?.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-white shadow rounded-lg p-4"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500 font-semibold">
                        ⭐ {rev.rating}
                      </span>

                      <span className="text-sm text-gray-600">
                        {rev.user?.fullName || rev.user?.name || "Anonymous"}
                      </span>
                    </div>

                    <p className="text-gray-800">{rev.comment}</p>

                    <p className="text-xs text-gray-400">
                      {rev.createdAt &&
                        new Date(rev.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* WRITE REVIEW FORM */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-black">
                  Write a Review
                </h3>

                <label className="block mb-2 text-sm font-medium text-black">
                  Rating (1–5)
                </label>

                <input
                  type="number"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full border rounded px-2 py-1 mb-3"
                />

                <label className="block mb-2 text-sm font-medium text-black">
                  Comment
                </label>

                <textarea
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border rounded px-2 py-1 mb-3"
                />

                <button
                  onClick={handleSubmitReview}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Submit Review
                </button>
              </div>
            </section>
          </div>
        </section>
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={menu.loading || restaurant.loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default Restaurant;
