import { Dispatch, SetStateAction } from "react";
import UserInterface from "../../UserInterface";
import UserListTableRow from "./UserListTableRow";

interface Props {
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
}: Props) => {
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

export default UserListTable;
