import UserInterface from "../../UserInterface";

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

export {NumericTD, TextTD, DateTD, TDAction, MappedTextTD}