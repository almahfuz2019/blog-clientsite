import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
const UseToken = (user) => {
  const [token, setToken] = useState("");
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const email = user?.email;
    const currentUser = { email: email };
    // console.log(token);
    if (email) {
      axios
        .post("http://localhost:5000/users", currentUser)
        .then((response) => {
          console.log(response.data.token);
          localStorage.setItem("accessToken", response.data.token);
          setToken(response.data.token);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);

  useEffect(() => {
     if(token){
          const user = jwtDecode(token);
          setAuthUser(user)
     }
  }, [token])



  return [token, authUser];
};
export default UseToken;
