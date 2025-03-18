import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const dispatch = useDispatch();
   const connections = useSelector((store) => store.connection);

   const fetchConnections = async () => {
      try {
         setLoading(true);
         // Notice we no longer need to append "/user/connections" to BASE_URL
         const res = await axios.get(`${BASE_URL}/user/connections`, { 
            withCredentials: true,
            headers: {
               'Content-Type': 'application/json'
            }
         });
         
         console.log("Connections data:", res.data); 
         
         // Add connections to Redux store
         if (res.data && res.data.data) {
            dispatch(addConnections(res.data.data));
         } else if (res.data) {
            // Fallback if data isn't nested in a data property
            dispatch(addConnections(res.data));
         }
         setLoading(false);
      } catch (err) {
         console.error("Error fetching connections:", err);
         setError("Failed to load connections. Please try again.");
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchConnections();
   }, []); // Empty array ensures it runs only once

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
         </div>
      );
   }

   // Check if connections exist and has accepted connections with more descriptive debugging
   console.log("Current connections state:", connections);
   
   const hasAcceptedConnections = connections && 
                                connections.accepted && 
                                Array.isArray(connections.accepted) && 
                                connections.accepted.length > 0;
   
   if (!hasAcceptedConnections) {
      return (
         <div className="flex flex-col justify-center items-center h-64 gap-4">
            <h1 className="text-xl font-semibold text-gray-500">No Connections Found</h1>
            <button 
               onClick={fetchConnections}
               className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
               Refresh Connections
            </button>
         </div>
      );
   }

   return (
      <div className="container mx-auto my-10 px-4">
         <h1 className="text-3xl font-bold text-center mb-8">Your Connections</h1>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connections.accepted.map((connection) => (
               <div key={connection._id || Math.random().toString()} className="bg-white rounded-lg shadow-md p-6 flex items-center">
                  <img 
                     src={connection.photoUrl || "https://via.placeholder.com/50"} 
                     alt={`${connection.firstName}'s profile`}
                     className="w-16 h-16 rounded-full object-cover mr-4"
                     onError={(e) => {
                        e.target.src = "https://via.placeholder.com/50";
                     }}
                  />
                  <div>
                     <h2 className="text-xl font-semibold">{connection.firstName} {connection.lastName}</h2>
                     {connection.about && <p className="text-gray-600 text-sm mt-1">{connection.about}</p>}
                     <div className="flex space-x-2 mt-2">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded">
                           Message
                        </button>
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm py-1 px-3 rounded">
                           View Profile
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Connections;