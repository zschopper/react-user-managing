import { Dispatch, SetStateAction } from "react";
import UserInterface from "../../UserInterface";
import { TDAction, NumericTD, TextTD, MappedTextTD, DateTD } from "./UserListTableTDs";

interface Props {
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
}: Props) => {
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

export default UserListTableRow;
