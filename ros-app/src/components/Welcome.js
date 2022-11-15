import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import api from '../API/posts';

export default function Welcome() {
  const location = useLocation();

  // const [id, setUserId] = useState(undefined);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const userID = location.state.id;
      console.log(userID);
      try {
        const response = await api.get(`/api/v1/users/${userID}`);
        console.log(response);
        setUser(response.data);
      } catch (err) {
        if (err.response) {
          //not in the 200 range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          //response is undefined
          console.log(`Error: ${err.message}`);
        }
      }
    };

    if (location.state.id !== undefined) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        hello
        {user === {} ? ' guest ' : ' ' + user.displayname}, Welcome!
      </div>
      <br></br>
      <hr></hr>
    </>
  );
}
