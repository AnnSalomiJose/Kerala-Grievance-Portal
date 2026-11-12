

// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import PublicLayout from "../layouts/PublicLayout";
// import Home from "../pages/Home";
// import About from "../pages/About";
// import Contact from "../pages/Contact";
// import HowItWorks from "../pages/HowItWorks";
// import Departments from "../pages/Department";
// import FAQ from "../pages/FAQ";
// import Register from "../pages/Register";
// import Login from "../pages/Login";
// import CitizenDashboard from "../pages/CitizenDashboard";
// import SubmitGrievance from "../pages/SubmitGrievance";

// function App() {
//   const isLoggedIn = Boolean(localStorage.getItem("token"));

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route element={<PublicLayout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/how-it-works" element={<HowItWorks />} />
//           <Route path="/departments" element={<Departments />} />
//           <Route path="/faq" element={<FAQ />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/login" element={<Login />} />

//           <Route
//             path="/citizen/dashboard"
//             element={
//               isLoggedIn ? (
//                 <CitizenDashboard />
//               ) : (
//                 <Navigate to="/login" replace />
//               )
//             }
//           />

//           <Route
//             path="/citizen/submit-grievance"
//             element={
//               isLoggedIn ? (
//                 <SubmitGrievance />
//               ) : (
//                 <Navigate to="/login" replace />
//               )
//             }
//           />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;




// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import PublicLayout from "../layouts/PublicLayout";

// import Home from "../pages/Home";
// import About from "../pages/About";
// import Contact from "../pages/Contact";
// import HowItWorks from "../pages/HowItWorks";
// import Departments from "../pages/Department";
// import FAQ from "../pages/FAQ";

// import Register from "../pages/Register";
// import Login from "../pages/Login";

// import CitizenDashboard from "../pages/CitizenDashboard";
// import SubmitGrievance from "../pages/SubmitGrievance";
// import MyGrievances from "../pages/MyGrievances";

// function App() {
//   const isLoggedIn = Boolean(localStorage.getItem("token"));

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route element={<PublicLayout />}>
          
//           {/* Public Pages */}
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/how-it-works" element={<HowItWorks />} />
//           <Route path="/departments" element={<Departments />} />
//           <Route path="/faq" element={<FAQ />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/login" element={<Login />} />

//           {/* Citizen Dashboard */}
//           <Route
//             path="/citizen/dashboard"
//             element={
//               isLoggedIn ? (
//                 <CitizenDashboard />
//               ) : (
//                 <Navigate to="/login" replace />
//               )
//             }
//           />

//           {/* Submit Grievance */}
//           <Route
//             path="/citizen/submit-grievance"
//             element={
//               isLoggedIn ? (
//                 <SubmitGrievance />
//               ) : (
//                 <Navigate to="/login" replace />
//               )
//             }
//           />

//           {/* My Grievances */}
//           <Route
//             path="/citizen/my-grievances"
//             element={
//               isLoggedIn ? (
//                 <MyGrievances />
//               ) : (
//                 <Navigate to="/login" replace />
//               )
//             }
//           />

//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;




// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import PublicLayout from "../layouts/PublicLayout";

// import Home from "../pages/Home";
// import About from "../pages/About";
// import Contact from "../pages/Contact";
// import HowItWorks from "../pages/HowItWorks";
// import Departments from "../pages/Department";
// import FAQ from "../pages/FAQ";

// import Register from "../pages/Register";
// import Login from "../pages/Login";

// import CitizenDashboard from "../pages/CitizenDashboard";
// import SubmitGrievance from "../pages/SubmitGrievance";
// import MyGrievances from "../pages/MyGrievances";
// import CMODashboard from "../pages/CMODashboard";

// function ProtectedRoute({ children, allowedRoles }) {
//   const token = localStorage.getItem("token");

//   let user = {};

//   try {
//     user = JSON.parse(localStorage.getItem("user") || "{}");
//   } catch {
//     user = {};
//   }

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!allowedRoles.includes(user.role)) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route element={<PublicLayout />}>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/how-it-works" element={<HowItWorks />} />
//           <Route path="/departments" element={<Departments />} />
//           <Route path="/faq" element={<FAQ />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />

//           <Route
//             path="/citizen/dashboard"
//             element={
//               <ProtectedRoute allowedRoles={["citizen"]}>
//                 <CitizenDashboard />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/citizen/submit-grievance"
//             element={
//               <ProtectedRoute allowedRoles={["citizen"]}>
//                 <SubmitGrievance />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/citizen/my-grievances"
//             element={
//               <ProtectedRoute allowedRoles={["citizen"]}>
//                 <MyGrievances />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/cmo/dashboard"
//             element={
//               <ProtectedRoute allowedRoles={["admin", "cmo"]}>
//                 <CMODashboard />
//               </ProtectedRoute>
//             }
//           />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;




import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import HowItWorks from "../pages/HowItWorks";
import Departments from "../pages/Department";
import FAQ from "../pages/FAQ";

import Register from "../pages/Register";
import Login from "../pages/Login";

import CitizenDashboard from "../pages/CitizenDashboard";
import SubmitGrievance from "../pages/SubmitGrievance";
import MyGrievances from "../pages/MyGrievances";
import CMODashboard from "../pages/CMODashboard";
import OfficerDashboard from "../pages/OfficerDashboard";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");

  let user = {};

  try {
    user = JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    user = {};
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Citizen Routes */}
          <Route
            path="/citizen/dashboard"
            element={
              <ProtectedRoute allowedRoles={["citizen"]}>
                <CitizenDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/citizen/submit-grievance"
            element={
              <ProtectedRoute allowedRoles={["citizen"]}>
                <SubmitGrievance />
              </ProtectedRoute>
            }
          />

          <Route
            path="/citizen/my-grievances"
            element={
              <ProtectedRoute allowedRoles={["citizen"]}>
                <MyGrievances />
              </ProtectedRoute>
            }
          />

          {/* CMO Routes */}
          <Route
            path="/cmo/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin", "cmo"]}>
                <CMODashboard />
              </ProtectedRoute>
            }
          />

          {/* Officer Route */}
          <Route
            path="/officer/dashboard"
            element={
              <ProtectedRoute allowedRoles={["officer"]}>
                <OfficerDashboard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
