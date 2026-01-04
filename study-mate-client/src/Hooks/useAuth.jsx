import React, { use } from "react"
import 
const useAuth = () => {
  const authInfo = use(AuthContext);
  return authInfo;
};

export default useAuth;
