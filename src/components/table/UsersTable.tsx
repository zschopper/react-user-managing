import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import UserModal from "../form/UserModal";
import Spinner from "../Spinner";
import UserInterface, { UserData } from "../../UserInterface";
import { Button } from "react-bootstrap";
import UserListTable from "./UserListTable";

export default function UsersTable() {
  const serverUrl = "http://localhost:8000/api";

  const [users, setUsers] = useState<UserInterface[]>([]);
  const [active, setActive] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalReadOnly, setModalReadOnly] = useState(false);

  // loads send user to inputs and displays modal
  const handleUserView = (user: UserInterface, readOnly: boolean) => {
    setActive(user.id ?? -1);
    setModalReadOnly(readOnly);
    setModalVisible(true);
  };

  // sends a post request to the server and adds user to local list from the response
  const handleUserAdd = (
    user: UserInterface,
    onSaveFinished?: (response: AxiosResponse) => void
  ) => {
    if (loading) {
      console.log("Loading!!");
    } else {
      setLoading(true);
      axios
        .post(`${serverUrl}/users/`, user)
        .then((response) => {
          console.log(response.data);

          users.push(response.data);
          setUsers(users);
          if (onSaveFinished) {
            onSaveFinished(response);
          }
        })
        .catch((error) => {
          if (onSaveFinished) {
            onSaveFinished(error.response);
          }

          console.error("Error adding user:", error.response.data.message);
        })
        .finally(() => {
          console.log("loading done");
          setLoading(false);
        });
      setActive(-1);
    }
  };

  // sends a put request to the server and updates the local user
  const handleUserUpdate = (
    user: UserInterface,
    onSaveFinished?: (response: AxiosResponse) => void
  ) => {
    if (loading) {
      console.log("Loading!!");
    } else {
      setLoading(true);
      axios
        .put(`${serverUrl}/users/${user.id}`, user)
        .then((response) => {
          console.log(response.data);
          const userFound = users.find((f) => f.id == user.id);
          let idx = -1;
          if (userFound !== undefined) {
            idx = users.indexOf(userFound);
          }
          if (idx === -1) {
            console.log("USER NOT FOUND!");
          }

          users[idx] = response.data;
          setUsers(users);
          if (onSaveFinished) {
            onSaveFinished(response);
          }
        })
        .catch((error) => {
          if (onSaveFinished) {
            onSaveFinished(error.response);
          }

          console.error("Error adding user:", error.response.data.message);
        })
        .finally(() => {
          console.log("loading done");
          setLoading(false);
        });
      setActive(-1);
    }

    // const user2: UserInterface = {
    //   // id : null,
    //   name: "Sántha Saci",
    //   email: "saci2@example.org",
    //   gender: "unknown",
    //   dob: new Date("1999-04-20"),
    //   country: "Magyarország",
    //   city: "Ajka",
    //   address1: "1481 Dombóvár, Balázs körönd 85.",
    //   address2: "2459 Nyíregyháza, Soós dűlőút 8. 02. ajtó",
    //   postcode: "7261",
    // } as UserInterface;
    // handleUserAdd(user2);
    // user.name = "E!";
    // setUsers(users);
  };

  // removes user from local list & sends a delete request to the server
  const handleUserDelete = (user: UserInterface) => {
    if (loading) {
      console.log("Loading!!");
    } else {
      const id = user.id;
      setLoading(true);
      axios
        .delete(`${serverUrl}/users/${user.id}`)
        .then(() => {
          setUsers(users.filter((user) => user.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        })
        .finally(() => {
          console.log("loading done");
          setLoading(false);
        });
      setActive(-1);
    }
  };

  const handleShowDialog = () => {
    setActive(-1);
    setModalVisible(true);
  };

  // load users
  useEffect(() => {
    setLoading(true);
    console.log("loading");
    axios
      .get(`${serverUrl}/users`)
      .then((response) => {
        // console.log(JSON.stringify(response));
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        console.error("Error fetching user data:", error);
      })
      .finally(() => {
        console.log("loading done");
        setLoading(false);
      });
  }, []);
  const user = users.filter((user) => user.id === active)[0] ?? {};
  return (
    <>
      <Button variant="primary" onClick={handleShowDialog}>
        Új felhasználó
      </Button>
      <div id="table-container">
        <Spinner shown={loading} />
        <UserListTable
          users={users}
          active={active}
          setActive={setActive}
          onUserView={handleUserView}
          onUserUpdate={handleUserUpdate}
          onUserDelete={handleUserDelete}
        />
      </div>
      <UserModal
        // user={active > 0 ? user : ( as UserInterface)}
        user={active > 0 ? user : new UserData()}
        readOnly={modalReadOnly}
        show={modalVisible}
        setShow={setModalVisible}
        onSave={active > 0 ? handleUserUpdate : handleUserAdd}
      />
    </>
  );
}

