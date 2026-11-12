
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { FiStar, FiMessageSquare, FiCheckCircle } from "react-icons/fi";

// function MyGrievances() {
//   const [grievances, setGrievances] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [ratings, setRatings] = useState({});
//   const [comments, setComments] = useState({});
//   const [feedbackLoading, setFeedbackLoading] = useState({});
//   const [feedbackErrors, setFeedbackErrors] = useState({});

//   useEffect(() => {
//     const fetchGrievances = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const response = await axios.get(
//           "https://kerala-grievance-portal-7.onrender.com",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setGrievances(response.data.grievances);
//       } catch (err) {
//         setError(
//           err.response?.data?.message ||
//             "Unable to load grievances."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGrievances();
//   }, []);

//   const getStatusStyle = (status) => {
//     const styles = {
//       Submitted: "bg-blue-100 text-blue-700",
//       "Under Review": "bg-yellow-100 text-yellow-700",
//       "In Progress": "bg-purple-100 text-purple-700",
//       Resolved: "bg-green-100 text-green-700",
//       Reopened: "bg-red-100 text-red-700",
//     };

//     return styles[status] || "bg-gray-100 text-gray-700";
//   };

//   const handleFeedback = async (grievanceId) => {
//     const rating = ratings[grievanceId];
//     const comment = comments[grievanceId] || "";

//     if (!rating) {
//       setFeedbackErrors((prev) => ({
//         ...prev,
//         [grievanceId]: "Please select a star rating.",
//       }));
//       return;
//     }

//     try {
//       setFeedbackLoading((prev) => ({
//         ...prev,
//         [grievanceId]: true,
//       }));

//       setFeedbackErrors((prev) => ({
//         ...prev,
//         [grievanceId]: "",
//       }));

//       const token = localStorage.getItem("token");

//       await axios.post(
//         `http://localhost:5000/api/grievances/${grievanceId}/feedback`,
//         {
//           rating,
//           comments: comment,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setGrievances((prev) =>
//         prev.map((item) =>
//           item._id === grievanceId
//             ? {
//                 ...item,
//                 feedback: {
//                   rating,
//                   comments: comment,
//                 },
//               }
//             : item
//         )
//       );
//     } catch (err) {
//       setFeedbackErrors((prev) => ({
//         ...prev,
//         [grievanceId]:
//           err.response?.data?.message ||
//           "Failed to submit feedback.",
//       }));
//     } finally {
//       setFeedbackLoading((prev) => ({
//         ...prev,
//         [grievanceId]: false,
//       }));
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-lg text-gray-600">
//           Loading your grievances...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4">
//       <div className="max-w-5xl mx-auto">

//         <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">
//               My Grievances
//             </h1>
//             <p className="text-gray-500 mt-2">
//               View and track your submitted complaints.
//             </p>
//           </div>

//           <Link
//             to="/citizen/dashboard"
//             className="bg-gray-800 text-white px-5 py-2.5 rounded-lg hover:bg-gray-700"
//           >
//             Back to Dashboard
//           </Link>
//         </div>

//         {error && (
//           <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-5">
//             {error}
//           </div>
//         )}

//         <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
//           <p className="text-gray-500">Total Grievances</p>
//           <h2 className="text-3xl font-bold text-blue-700 mt-2">
//             {grievances.length}
//           </h2>
//         </div>

//         {grievances.length === 0 ? (
//           <div className="bg-white rounded-xl shadow-sm p-10 text-center">
//             <h2 className="text-xl font-semibold text-gray-700">
//               No grievances found
//             </h2>
//             <p className="text-gray-500 mt-2">
//               You have not submitted any grievances yet.
//             </p>

//             <Link
//               to="/citizen/submit-grievance"
//               className="inline-block mt-5 bg-blue-700 text-white px-6 py-3 rounded-lg"
//             >
//               Submit Grievance
//             </Link>
//           </div>
//         ) : (
//           <div className="space-y-5">
//             {grievances.map((grievance) => (
//               <div
//                 key={grievance._id}
//                 className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
//               >
//                 <div className="flex flex-wrap justify-between gap-3">
//                   <div>
//                     <p className="text-sm text-gray-500">
//                       Reference Number
//                     </p>
//                     <h3 className="font-bold text-blue-700 mt-1">
//                       {grievance.referenceNumber}
//                     </h3>
//                   </div>

//                   <span
//                     className={`h-fit px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
//                       grievance.status
//                     )}`}
//                   >
//                     {grievance.status}
//                   </span>
//                 </div>

//                 <div className="grid sm:grid-cols-2 gap-4 mt-6">
//                   <div>
//                     <p className="text-sm text-gray-500">Subject</p>
//                     <p className="font-medium text-gray-800 mt-1">
//                       {grievance.subject}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-sm text-gray-500">District</p>
//                     <p className="font-medium text-gray-800 mt-1">
//                       {grievance.district}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-sm text-gray-500">Category</p>
//                     <p className="font-medium text-gray-800 mt-1">
//                       {grievance.category}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-sm text-gray-500">Priority</p>
//                     <p className="font-medium text-gray-800 mt-1">
//                       {grievance.priority}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-5">
//                   <p className="text-sm text-gray-500">Description</p>
//                   <p className="text-gray-700 mt-1">
//                     {grievance.description}
//                   </p>
//                 </div>

//                 <div className="mt-5">
//                   <p className="text-sm text-gray-500">Submitted On</p>
//                   <p className="text-gray-700 mt-1">
//                     {new Date(grievance.createdAt).toLocaleString("en-IN")}
//                   </p>
//                 </div>

//                 {grievance.attachments?.length > 0 && (
//                   <div className="mt-5">
//                     <p className="text-sm text-gray-500 mb-2">
//                       Attachments
//                     </p>

//                     {grievance.attachments.map((file) => (
//                       <a
//                         key={file._id}
//                         href={`http://localhost:5000${file.path}`}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="text-blue-600 underline block"
//                       >
//                         {file.filename}
//                       </a>
//                     ))}
//                   </div>
//                 )}

//                 <div className="mt-5 border-t pt-4">
//                   <p className="font-semibold text-gray-700 mb-2">
//                     Status History
//                   </p>

//                   {grievance.history?.map((item) => (
//                     <div
//                       key={item._id}
//                       className="border-l-2 border-blue-500 pl-4 py-2"
//                     >
//                       <p className="font-medium text-gray-800">
//                         {item.status}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         {item.remarks}
//                       </p>
//                       <p className="text-xs text-gray-400 mt-1">
//                         {new Date(item.changedAt).toLocaleString("en-IN")}
//                       </p>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Feedback Section */}
//                 {grievance.status === "Resolved" && (
//                   <div className="mt-6 border-t pt-6">
//                     <div className="flex items-center gap-2 mb-4">
//                       <FiMessageSquare className="text-blue-600 text-xl" />
//                       <h3 className="text-lg font-bold text-gray-800">
//                         Citizen Feedback
//                       </h3>
//                     </div>

//                     {grievance.feedback?.rating ? (
//                       <div className="bg-green-50 border border-green-200 rounded-xl p-5">
//                         <div className="flex items-center gap-2 text-green-700 font-semibold">
//                           <FiCheckCircle />
//                           Feedback Submitted
//                         </div>

//                         <div className="flex gap-1 mt-3">
//                           {[1, 2, 3, 4, 5].map((star) => (
//                             <FiStar
//                               key={star}
//                               className={
//                                 star <= grievance.feedback.rating
//                                   ? "text-yellow-500 fill-yellow-400"
//                                   : "text-gray-300"
//                               }
//                             />
//                           ))}
//                         </div>

//                         <p className="text-gray-700 mt-3">
//                           {grievance.feedback.comments ||
//                             "No comments provided."}
//                         </p>
//                       </div>
//                     ) : (
//                       <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
//                         <p className="text-gray-700 mb-4">
//                           Your grievance has been resolved. Please share
//                           your experience with us.
//                         </p>

//                         <p className="font-medium text-gray-800 mb-3">
//                           Rate our service
//                         </p>

//                         <div className="flex gap-3 mb-5">
//                           {[1, 2, 3, 4, 5].map((star) => (
//                             <button
//                               key={star}
//                               type="button"
//                               onClick={() =>
//                                 setRatings((prev) => ({
//                                   ...prev,
//                                   [grievance._id]: star,
//                                 }))
//                               }
//                               className="focus:outline-none"
//                             >
//                               <FiStar
//                                 size={30}
//                                 className={
//                                   star <= (ratings[grievance._id] || 0)
//                                     ? "text-yellow-500 fill-yellow-400"
//                                     : "text-gray-300"
//                                 }
//                               />
//                             </button>
//                           ))}
//                         </div>

//                         <label className="block font-medium text-gray-800 mb-2">
//                           Your Comments
//                         </label>

//                         <textarea
//                           rows="3"
//                           value={comments[grievance._id] || ""}
//                           onChange={(e) =>
//                             setComments((prev) => ({
//                               ...prev,
//                               [grievance._id]: e.target.value,
//                             }))
//                           }
//                           placeholder="Share your feedback..."
//                           className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
//                         />

//                         {feedbackErrors[grievance._id] && (
//                           <p className="text-red-600 text-sm mt-2">
//                             {feedbackErrors[grievance._id]}
//                           </p>
//                         )}

//                         <button
//                           type="button"
//                           onClick={() => handleFeedback(grievance._id)}
//                           disabled={feedbackLoading[grievance._id]}
//                           className="mt-4 bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 disabled:opacity-50"
//                         >
//                           {feedbackLoading[grievance._id]
//                             ? "Submitting..."
//                             : "Submit Feedback"}
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default MyGrievances;



import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FiStar,
  FiMessageSquare,
  FiCheckCircle,
} from "react-icons/fi";

function MyGrievances() {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const [feedbackLoading, setFeedbackLoading] = useState({});
  const [feedbackErrors, setFeedbackErrors] = useState({});

  const API_URL = "https://kerala-grievance-portal-7.onrender.com";

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${API_URL}/api/grievances/my-grievances`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setGrievances(response.data.grievances);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load grievances."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGrievances();
  }, []);

  const getStatusStyle = (status) => {
    const styles = {
      Submitted: "bg-blue-100 text-blue-700",
      "Under Review": "bg-yellow-100 text-yellow-700",
      "In Progress": "bg-purple-100 text-purple-700",
      Resolved: "bg-green-100 text-green-700",
      Reopened: "bg-red-100 text-red-700",
    };

    return styles[status] || "bg-gray-100 text-gray-700";
  };

  const handleFeedback = async (grievanceId) => {
    const rating = ratings[grievanceId];
    const comment = comments[grievanceId] || "";

    if (!rating) {
      setFeedbackErrors((prev) => ({
        ...prev,
        [grievanceId]: "Please select a star rating.",
      }));
      return;
    }

    try {
      setFeedbackLoading((prev) => ({
        ...prev,
        [grievanceId]: true,
      }));

      setFeedbackErrors((prev) => ({
        ...prev,
        [grievanceId]: "",
      }));

      const token = localStorage.getItem("token");

      await axios.post(
        `${API_URL}/api/grievances/${grievanceId}/feedback`,
        {
          rating,
          comments: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setGrievances((prev) =>
        prev.map((item) =>
          item._id === grievanceId
            ? {
                ...item,
                feedback: {
                  rating,
                  comments: comment,
                },
              }
            : item
        )
      );
    } catch (err) {
      setFeedbackErrors((prev) => ({
        ...prev,
        [grievanceId]:
          err.response?.data?.message ||
          "Failed to submit feedback.",
      }));
    } finally {
      setFeedbackLoading((prev) => ({
        ...prev,
        [grievanceId]: false,
      }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">
          Loading your grievances...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">

        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              My Grievances
            </h1>
            <p className="text-gray-500 mt-2">
              View and track your submitted complaints.
            </p>
          </div>

          <Link
            to="/citizen/dashboard"
            className="bg-gray-800 text-white px-5 py-2.5 rounded-lg hover:bg-gray-700"
          >
            Back to Dashboard
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-5">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <p className="text-gray-500">Total Grievances</p>
          <h2 className="text-3xl font-bold text-blue-700 mt-2">
            {grievances.length}
          </h2>
        </div>

        {grievances.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              No grievances found
            </h2>
            <p className="text-gray-500 mt-2">
              You have not submitted any grievances yet.
            </p>

            <Link
              to="/citizen/submit-grievance"
              className="inline-block mt-5 bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Submit Grievance
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {grievances.map((grievance) => (
              <div
                key={grievance._id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex flex-wrap justify-between gap-3">
                  <div>
                    <p className="text-sm text-gray-500">
                      Reference Number
                    </p>
                    <h3 className="font-bold text-blue-700 mt-1">
                      {grievance.referenceNumber}
                    </h3>
                  </div>

                  <span
                    className={`h-fit px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                      grievance.status
                    )}`}
                  >
                    {grievance.status}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                  <div>
                    <p className="text-sm text-gray-500">Subject</p>
                    <p className="font-medium text-gray-800 mt-1">
                      {grievance.subject}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">District</p>
                    <p className="font-medium text-gray-800 mt-1">
                      {grievance.district}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium text-gray-800 mt-1">
                      {grievance.category}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Priority</p>
                    <p className="font-medium text-gray-800 mt-1">
                      {grievance.priority}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="text-gray-700 mt-1">
                    {grievance.description}
                  </p>
                </div>

                <div className="mt-5">
                  <p className="text-sm text-gray-500">Submitted On</p>
                  <p className="text-gray-700 mt-1">
                    {new Date(grievance.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>

                {grievance.attachments?.length > 0 && (
                  <div className="mt-5">
                    <p className="text-sm text-gray-500 mb-2">
                      Attachments
                    </p>

                    {grievance.attachments.map((file) => (
                      <a
                        key={file._id}
                        href={`${API_URL}${file.path}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline block"
                      >
                        {file.filename}
                      </a>
                    ))}
                  </div>
                )}

                <div className="mt-5 border-t pt-4">
                  <p className="font-semibold text-gray-700 mb-2">
                    Status History
                  </p>

                  {grievance.history?.map((item) => (
                    <div
                      key={item._id}
                      className="border-l-2 border-blue-500 pl-4 py-2"
                    >
                      <p className="font-medium text-gray-800">
                        {item.status}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.remarks}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(item.changedAt).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>

                {grievance.status === "Resolved" && (
                  <div className="mt-6 border-t pt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <FiMessageSquare className="text-blue-600 text-xl" />
                      <h3 className="text-lg font-bold text-gray-800">
                        Citizen Feedback
                      </h3>
                    </div>

                    {grievance.feedback?.rating ? (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                        <div className="flex items-center gap-2 text-green-700 font-semibold">
                          <FiCheckCircle />
                          Feedback Submitted
                        </div>

                        <div className="flex gap-1 mt-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FiStar
                              key={star}
                              className={
                                star <= grievance.feedback.rating
                                  ? "text-yellow-500 fill-yellow-400"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>

                        <p className="text-gray-700 mt-3">
                          {grievance.feedback.comments ||
                            "No comments provided."}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                        <p className="text-gray-700 mb-4">
                          Your grievance has been resolved. Please share
                          your experience with us.
                        </p>

                        <p className="font-medium text-gray-800 mb-3">
                          Rate our service
                        </p>

                        <div className="flex gap-3 mb-5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() =>
                                setRatings((prev) => ({
                                  ...prev,
                                  [grievance._id]: star,
                                }))
                              }
                              className="focus:outline-none"
                            >
                              <FiStar
                                size={30}
                                className={
                                  star <= (ratings[grievance._id] || 0)
                                    ? "text-yellow-500 fill-yellow-400"
                                    : "text-gray-300"
                                }
                              />
                            </button>
                          ))}
                        </div>

                        <label className="block font-medium text-gray-800 mb-2">
                          Your Comments
                        </label>

                        <textarea
                          rows="3"
                          value={comments[grievance._id] || ""}
                          onChange={(e) =>
                            setComments((prev) => ({
                              ...prev,
                              [grievance._id]: e.target.value,
                            }))
                          }
                          placeholder="Share your feedback..."
                          className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {feedbackErrors[grievance._id] && (
                          <p className="text-red-600 text-sm mt-2">
                            {feedbackErrors[grievance._id]}
                          </p>
                        )}

                        <button
                          type="button"
                          onClick={() => handleFeedback(grievance._id)}
                          disabled={feedbackLoading[grievance._id]}
                          className="mt-4 bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 disabled:opacity-50"
                        >
                          {feedbackLoading[grievance._id]
                            ? "Submitting..."
                            : "Submit Feedback"}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyGrievances;
