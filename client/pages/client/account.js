import UserAccount from "./acc/user";
import AdminAccount from "./acc/admin";
import client from "../../utils/client";
import { useState, useEffect } from "react";

export default function Account() {
  //admin control acc
  const [role, setRole] = useState(0);

  useEffect(() => {
    const getAccounts = async () => {
      try {
        const response = await client.get(
          `http://localhost:8000/api/admin/accounts`
        );
        setRole(response[0].role);
      } catch (error) {
        
      }
    };
    getAccounts();
  }, []);
  if (role === 1) {
    return <AdminAccount />;
  } else if (role === 0) {
    return <UserAccount />;
  }
}
