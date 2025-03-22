
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
//import StartUpDetails from "./componets/StartUpDetails.jsx";
// import { useDispatch, useSelector } from "react-redux";
// import { supabase } from "./supabaseClient.js"; // import supabase instance
// import { useEffect, useState } from "react";
// import { addUser, removeUser } from "./componets/store/slices/userSlice.js";
import Signup from "./components/Signup.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Profile from "./components/Profile.jsx";
import Login from "./components/Login.jsx";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient.js";

function App() {
  // const dispatch = useDispatch();
  // const user = useSelector((store) => store.user.user);
  const [loading, setLoading] = useState(true);

  // Check the user's session on app load
  useEffect(() => {
    const fetchUser = async (sessionUser = null) => {
      try {
        // Get authenticated user if not provided
        const {
          data: { user: loggedInUser },
        } = sessionUser
          ? { data: { user: sessionUser } }
          : await supabase.auth.getUser();

        // Fetch public user details from the database
        const { data: userDetails, error } = await supabase
          .from("User") // Adjust to match your actual table name
          .select("*")
          .eq("id", loggedInUser.id)
          .single();

        if (error) {
          console.error("Error fetching user details:", error);
        } else if (userDetails) {
        }
      } catch (err) {
        console.error("Unexpected error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    // Initial Fetch
    fetchUser();

    // Listen for authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        fetchUser(session?.user || null);
      }
    );

    // Cleanup function to unsubscribe from auth listener
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Showing a loading indicator while fetching user data
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    
  ]);

  return <RouterProvider router={router} />;
}

export default App;
