import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Request = () => {
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [actionInProgress, setActionInProgress] = useState(false);
   const dispatch = useDispatch();

   const requests = useSelector((store) => store.requests);

   const fetchRequests = async () => {
      try {
         setLoading(true);
         setError(null);
         const res = await axios.get(`${BASE_URL}/user/requests/received`, { withCredentials: true });

         console.log("Requests data:", res.data);

         if (res.data && res.data.data) {
            dispatch(addRequest(res.data.data));
         } else {
            dispatch(addRequest(res.data));
         }
      } catch (err) {
         console.error("Error fetching requests:", err);
         setError("Failed to load friend requests. Please try again.");
      } finally {
         setLoading(false);
      }
   };

   const handleRequestAction = async (_id, status) => {
      if (actionInProgress) return;
      
      try {
         setActionInProgress(true);
         
         // Use the correct endpoint format: /request/review/accepted/[id] or /request/review/rejected/[id]
         const endpoint = `${BASE_URL}/request/review/${status === "accept" ? "accepted" : "rejected"}/${_id}`;
         
         console.log(`Processing ${status} request to: ${endpoint}`);
         
         const response = await axios.post(
            endpoint,
            {},
            { withCredentials: true }
         );
         
         console.log(`${status.toUpperCase()} response:`, response.data);
         
         // Remove this request from the Redux store instead of fetching all requests again
         dispatch(removeRequest(_id));
         
      } catch (err) {
         console.error(`Error ${status}ing request:`, err);
         setError(`Failed to ${status} request. Please try again.`);
      } finally {
         setActionInProgress(false);
      }
   };

   useEffect(() => {
      fetchRequests();
   }, []);

   if (loading) {
      return (
         <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="flex justify-center items-center h-64">
            <div className="text-red-500">{error}</div>
            <button
               onClick={fetchRequests}
               className="ml-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
               Try Again
            </button>
         </div>
      );
   }

   const hasPendingRequests = requests && Array.isArray(requests) && requests.length > 0;

   if (!hasPendingRequests) {
      return (
         <div className="flex flex-col justify-center items-center h-64 gap-4">
            <h1 className="text-xl font-semibold text-gray-500">No Friend Requests Found</h1>
            <button
               onClick={fetchRequests}
               className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
               Refresh Requests
            </button>
         </div>
      );
   }

   return (
      <div className="container mx-auto my-10 px-4">
         <h1 className="text-3xl font-bold text-center mb-8">Friend Requests</h1>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request) => (
               <div key={request._id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-4">
                     <img
                        src={request.fromUser?.photoUrl || "https://via.placeholder.com/50"}
                        alt={`${request.fromUser?.firstName || "User"}'s profile`}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                        onError={(e) => {
                           e.target.src = "https://via.placeholder.com/50";
                        }}
                     />
                     <div>
                        <h2 className="text-xl font-semibold">
                           {request.fromUser?.firstName || "User"} {request.fromUser?.lastName || ""}
                        </h2>
                        {request.fromUser?.about && (
                           <p className="text-gray-600 text-sm mt-1">{request.fromUser.about}</p>
                        )}
                     </div>
                  </div>

                  <div className="border-t pt-4">
                     <p className="text-gray-500 mb-3 text-sm">
                        Request sent: {new Date(request.createdAt).toLocaleDateString()}
                     </p>
                     <div className="flex space-x-2">
                        <button
                           onClick={() => handleRequestAction(request._id, "accept")}
                           className={`flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded ${
                              actionInProgress ? "opacity-50 cursor-not-allowed" : ""
                           }`}
                           disabled={actionInProgress}
                        >
                           {actionInProgress ? "Processing..." : "Accept"}
                        </button>
                        <button
                           onClick={() => handleRequestAction(request._id, "reject")}
                           className={`flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded ${
                              actionInProgress ? "opacity-50 cursor-not-allowed" : ""
                           }`}
                           disabled={actionInProgress}
                        >
                           {actionInProgress ? "Processing..." : "Reject"}
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Request;