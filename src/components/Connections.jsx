import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const dispatch = useDispatch();
   const connections = useSelector((store) => store.connection);

  // In Connections.jsx, modify the fetchConnections function:
// In Connections.jsx
const fetchConnections = async () => {
   try {
      setLoading(true);
      setError(null); // Reset error state before fetching
      
      const res = await axios.get(`${BASE_URL}/user/connections`, { 
         withCredentials: true,
         headers: {
            'Content-Type': 'application/json'
         }
      });
      
      console.log("Connections data:", res.data); 
      
      // Check if data exists and has the right structure
      if (res.data && res.data.success && res.data.data) {
         dispatch(addConnections(res.data.data));
         setLoading(false);
      } else {
         console.error("Invalid data format:", res.data);
         setError("Invalid data format received from server");
         setLoading(false);
      }
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
   
   // Update this check in Connections.jsx
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
   src={connection.photoUrl || "/default-avatar.png"} 
   alt={`${connection.firstName}'s profile`}
   className="w-16 h-16 rounded-full object-cover mr-4"
   onError={(e) => {
      // Replace with inline SVG or a reliable default image
      e.target.onerror = null; // Prevent infinite loop
      e.target.src = "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3e%3crect width='64' height='64' fill='%23eee'/%3e%3ctext x='32' y='32' dy='.3em' font-size='24' text-anchor='middle' alignment-baseline='middle' font-family='sans-serif' fill='%23aaa'%3eUser%3c/text%3e%3c/svg%3e";
   }}
/>
                  <div>
                     <h2 className="text-xl font-semibold">{connection.firstName} {connection.lastName}</h2>
                     {connection.about && <p className="text-gray-600 text-sm mt-1">{connection.about}</p>}
                     <div className="flex space-x-2 mt-2">
                        <Link to = {'/chat/' + connection._id}> 
                        <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded">
                           Message
                        </button>
                        </Link>
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