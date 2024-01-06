import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import UserModal from "../form/UserModal";
import Spinner from "../Spinner";
import UserInterface, { UserData } from "../../UserInterface";
import { Button } from "react-bootstrap";

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

interface UserListTableProps {
  users: UserInterface[];
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
  onUserView: (user: UserInterface, readOnly: boolean) => void;
  onUserUpdate: (user: UserInterface) => void;
  onUserDelete: (user: UserInterface) => void;
}

const UserListTable = ({
  users,
  active,
  setActive,
  onUserView,
  onUserUpdate,
  onUserDelete,
}: UserListTableProps) => {
  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Col #1</th>
            <th>Col #2</th>
            <th>Col #3</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, key) => (
            <UserListTableRow
              user={user}
              key={key}
              onUserView={onUserView}
              onUserUpdate={onUserUpdate}
              onUserDelete={onUserDelete}
              active={active}
              setActive={setActive}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

interface UserListTableRowProps {
  user: UserInterface;
  onUserView: (user: UserInterface, readOnly: boolean) => void;
  onUserUpdate: (user: UserInterface) => void;
  onUserDelete: (user: UserInterface) => void;
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
}

const UserListTableRow = ({
  user,
  onUserView,
  onUserUpdate,
  onUserDelete,
  active,
  setActive,
}: UserListTableRowProps) => {
  const uid: number = user.id || -1;

  const genderMapping: Record<string, string> = {
    unknown: "Ismeretlen",
    female: "nő",
    male: "férfi",
  };

  return (
    <tr
      className={active === uid ? "active" : ""}
      // onClick={() => setActive(uid >= 0 && uid === active ? -1 : uid)}
      onClick={() => setActive(uid)}
    >
      <TDAction
        user={user}
        onUserView={onUserView}
        onUserUpdate={onUserUpdate}
        onUserDelete={onUserDelete}
      />
      <NumericTD value={user.id} />
      <TextTD value={user.name} />
      <TextTD value={user.email} />
      <MappedTextTD value={user.gender} map={genderMapping} />
      <DateTD value={user.dob} />
      <TextTD value={user.country} />
      <TextTD value={user.city} />
    </tr>
  );
};

interface TDNumericProps {
  value?: number;
}

function NumericTD({ value }: TDNumericProps) {
  return <td>{value}</td>;
}

interface TDTextProps {
  value: string;
}

function TextTD({ value }: TDTextProps) {
  return <td>{value}</td>;
}

interface TDDateProps {
  value: Date;
}

function DateTD({ value }: TDDateProps) {
  return <td>{value.toLocaleString()}</td>;
}

interface TDActionProps {
  user: UserInterface;
  onUserView: (user: UserInterface, readOnly: boolean) => void;
  onUserUpdate: (user: UserInterface) => void;
  onUserDelete: (user: UserInterface) => void;
}

function TDAction({ user, onUserView, onUserDelete }: TDActionProps) {
  return (
    <td>
      <a className="data-view">
        <i
          className="fa-solid fa-magnifying-glass"
          title="A kiválasztott elem megjelenítése"
          onClick={() => onUserView(user, true)}
        ></i>
      </a>
      &nbsp;
      <a className="data-update">
        <i
          className="fa-solid fa-pen-to-square"
          title="A kiválasztott elem szerkesztése"
          onClick={() => onUserView(user, false)}
        ></i>
      </a>
      &nbsp;
      <a className="data-delete">
        <i
          className="fa-solid fa-trash"
          title="A kiválasztott elem törlése"
          onClick={() => onUserDelete(user)}
        ></i>
      </a>
    </td>
  );
}

interface TDMappedTextProps {
  map: Record<string, string>;
  value: string;
}
function MappedTextTD({ map, value }: TDMappedTextProps) {
  return <td>{map[value] ?? "??"}</td>;
}
