import React from "react";
import AddressCard from "../../components/Address/AddressCard";
import { useSelector } from "react-redux";

const UsersAddresses = () => {
  // Here I am grabbing the authenticated user's info from Redux state.
  // I only need the auth slice, so I destructure it directly.
  const { auth } = useSelector((state) => state);

  return (
    <div className="min-h-[70vh]">
      <div className="flex flex-col items-center lg:px-10">
        {/* Heading for the address section */}
        <h1 className="text-xl font-semibold text-center py-7">
          Saved Addresses
        </h1>

        {/* 
          Here I’m simply looping through all addresses stored under the logged-in user. 
          This ensures that whatever address the user added earlier is displayed consistently.
        */}
        <div className="flex justify-center flex-wrap gap-3">
          {auth?.user?.addresses?.map((addressItem, index) => (
            <AddressCard key={index} item={addressItem} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersAddresses;
