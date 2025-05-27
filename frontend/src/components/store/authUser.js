// import axios from 'axios';
// import toast from 'react-hot-toast';
// import {create} from 'zustand';

// export const useAuthStore = create((set) => ({
//     user: null,
//     isSigningUp: false,
//     isCheckingAuth: true,
//     signUp: async(credentials) => {
//         set({isSigningUp: true});
//         try {
//             const response = await axios.post("http://localhost:8000/api/v1/auth/signup", credentials);
//             set({user:response.data.user, isSigningUp: false});
//             toast.success("Account created successfully.");
//         } catch (error) {
//             toast.error(error.response.data.message || "An error occurred.");
//             set({isSigningUp: false, user: null});            
//         }
//     },
//     login: async() => {},
//     logout: async() => {},
//     authCheck: async() => {
//         set({isCheckingAuth: true});
//         try {
//             const response = await axios.get("http://localhost:8000/api/v1/auth/authCheck");
//             set({user: response.data.user, isCheckingAuth: false});
//         } catch (error) {
//             set({isCheckingAuth: false,user: null });
//             console.log(error);
//         }
//     },
// }));




import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,

    signUp: async (credentials) => {
        set({ isSigningUp: true });
        try {
            const response = await axios.post("http://localhost:8000/api/v1/auth/signup", credentials, {
                withCredentials: true
            });
            set({ user: response.data.user, isSigningUp: false });
            toast.success("Account created successfully.");
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred.");
            set({ isSigningUp: false, user: null });
        }
    },

    login: async (credentials) => {
  try {
    const response = await axios.post("http://localhost:8000/api/v1/auth/signin", credentials, { withCredentials: true });
    set({ user: response.data.user });
    toast.success("Logged in successfully.");
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed.");
  }
},

    logout: async () => {
  try {
    await axios.post("http://localhost:8000/api/v1/auth/logout", {}, { withCredentials: true });
    set({ user: null });
    toast.success("Logout successful");
  } catch (error) {
    toast.error("Logout failed");
    console.log("logout error:", error);
    
  }
},

    authCheck: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await axios.get("http://localhost:8000/api/v1/auth/authCheck", {
                withCredentials: true
            });
            set({ user: response.data.user, isCheckingAuth: false });
        } catch (error) {
            set({ isCheckingAuth: false, user: null });
            console.log("authCheck error:", error?.response?.data?.message);
        }
    },
}));
