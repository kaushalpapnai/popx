import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Signup from "./components/Signup.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Profile from "./components/Profile.jsx";
import Login from "./components/Login.jsx";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient.js";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "./store/userSlice.js";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const [loading, setLoading] = useState(true);
  
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Check the user's session on app load
  useEffect(() => {
    const fetchUser = async (session = null) => {
      try {
        // If no session provided, get the current session
        if (!session) {
          const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
          
          if (sessionError) {
            console.error("Error fetching session:", sessionError);
            dispatch(removeUser());
            setLoading(false);
            return;
          }
          
          session = sessionData.session;
        }
        
        // If no session or user, remove user from store
        if (!session || !session.user) {
          dispatch(removeUser());
          setLoading(false);
          return;
        }
        
        // Use the auth user data directly
        const userData = {
          id: session.user.id,
          email: session.user.email,
          // Other useful properties from the auth user
          phone: session.user.phone,
          created_at: session.user.created_at,
          last_sign_in_at: session.user.last_sign_in_at,
          app_metadata: session.user.app_metadata,
          user_metadata: session.user.user_metadata,
          // Include any custom user_metadata fields that might be set during signup
          ...session.user.user_metadata
        };
        
        dispatch(addUser(userData));
      } catch (err) {
        console.error("Unexpected error fetching user:", err);
        dispatch(removeUser());
      } finally {
        setLoading(false);
      }
    };
    
    // Initial Fetch
    fetchUser();
    
    // Listen for authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        fetchUser(session);
      }
    );
    
    // Cleanup function to unsubscribe from auth listener
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [dispatch]);
  
  // Create router with protected routes - Re-create when auth state changes
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/signup",
      element: user ? <Navigate to="/profile" /> : <Signup />,
    },
    {
      path: "/login",
      element: user ? <Navigate to="/profile" /> : <Login />,
    },
    {
      path: "/profile",
      element: user ? <Profile /> : <Navigate to="/login" />,
    },
  ]);
  
  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching user data
  }
  
  return <RouterProvider router={router} key={user ? 'authenticated' : 'unauthenticated'} />;
}

export default App;