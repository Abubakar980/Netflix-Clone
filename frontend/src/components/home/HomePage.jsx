// import { useAuthStore } from '../store/authUser';
// import AuthScreen from './AuthScreen';
// import HomeScreen from './HomeScreen';

// const HomePage = () => {

//     const {user} = useAuthStore();
//     console.log("Auth user is here: ", user);
    

//   return (
//     <div>
//       {user ? <HomeScreen/> : <AuthScreen/>}
//     </div>
//   )
// }

// export default HomePage





import { useAuthStore } from '../store/authUser';
import AuthScreen from './AuthScreen';
import HomeScreen from './HomeScreen';

const HomePage = () => {
  const { user, isCheckingAuth } = useAuthStore();
  console.log("Auth user is here: ", user);

  // Jab tak authCheck chal raha ho, loading dikhayein
  if (isCheckingAuth) {
    return <div>Loading...</div>; // Tu yahan spinner bhi use kar sakta hai
  }

  // User signed up/login ho chuka hai
  return (
    <>
      {user ? <HomeScreen /> : <AuthScreen />}
    </>
  );
};

export default HomePage;
