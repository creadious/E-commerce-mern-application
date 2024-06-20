import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hook/useAxiosSecure";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useState } from "react";

const ShowAddresses = ({ handleSelectAddress, selectedAddress }) => {
  const [axiosSecure] = useAxiosSecure();

  const { data: allAddresses = [], isLoading: loading } = useQuery({
    queryKey: ["allAddresses"],
    // enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/address/view-address`);
      const data = res.data;
      if (data.success) {
        return data.data;
      }
    },
  });

  return (
    <div className="mb-4 flex flex-col items-start gap-5">
      {allAddresses?.map((value) => {
        return (
          <div
            key={value?._id}
            className={`relative rounded-md bg-slate-200 p-4 pe-6 ${
              selectedAddress === value?._id
                ? "outline rounded-m outline-slate-500"
                : ""
            } `}
          >
            <div className="absolute right-2 top-1">
              <input
                type="checkbox"
                name="selectedAddress"
                id={`select-${value?._id}`}
                className="scale-150"
                checked={selectedAddress === value?._id}
                onChange={() => handleSelectAddress(value?._id)}
              />
            </div>
            <div className="absolute bottom-0 right-2 space-x-2">
              {/* <button
                className=" text-2xl"
                title="Edit address"
              >
                <AiFillEdit />
              </button> */}
              <button
                className=" text-2xl text-red-500 "
                title="Delete address"
              >
                <AiFillDelete />
              </button>
            </div>
            <ul className=" text-sm space-y-1 md:w-80">
              <li>
                <span className="font-medium">Name:</span> {value?.fullName}
              </li>
              <li>
                <span className="font-medium">Email:</span> {value?.email}
              </li>
              <li>
                <span className="font-medium">Address:</span> {value?.address}
              </li>
              <li>
                <span className="font-medium">City:</span> {value?.city}
              </li>
              <li>
                <span className="font-medium">State:</span> {value?.state}
              </li>
              <li>
                <span className="font-medium">Country:</span> {value?.country}
              </li>
              <li>
                <span className="font-medium">Pin Code:</span> {value?.pinCode}
              </li>
              <li>
                <span className="font-medium">Phone no.:</span> {value?.phone}
              </li>
              {value.alternatePhone && (
                <li>
                  <span className="font-medium">Alternate no.:</span>{" "}
                  {value?.alternatePhone}
                </li>
              )}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default ShowAddresses;
