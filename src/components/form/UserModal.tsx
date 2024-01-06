import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import UserInterface from "../../UserInterface";

interface Props {
  user: UserInterface;
  readOnly: boolean;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  onSave?: (user: UserInterface) => void;
}
const UserModal = ({ user, readOnly, show, setShow, onSave }: Props) => {
  const [formData, setFormData] = useState<UserInterface>(user);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleClose = () => setShow(false);
  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
    handleClose();
  };

  // pre-checks - if modal's been shown
  if (show) {
    if (readOnly && user === null) console.log("readonly empty user");
  }

  // Handle form input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

    console.log("handleChange", formData);
  };

  const title = formData?.id ? `${formData.name || "[névtelen]"} ${readOnly ? ' megtekintése' : ' szerkesztése'}` : "Új felhasználó";
  // const title =
  //   user === undefined || user.name == undefined
  //     ? "Új felhasználó"
  //     : readOnly
  //     ? `${user.name} megtekintése`
  //     : `${user.name} szerkesztése`;
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        //keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Név</Form.Label>
              <Form.Control
                type="text"
                {...(readOnly ? { readOnly: true } : {})}
                value={formData.name}
                onChange={handleChange}
                name="name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="text"
                {...(readOnly ? { readOnly: true } : {})}
                value={formData.email}
                onChange={handleChange}
                name="email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicGender">
              <Form.Label>Nem</Form.Label>
              <Form.Check
                type="radio"
                id="gender-unknown"
                label="ismeretlen"
                name="gender"
                value="unknown"
                checked={formData.gender === "unknown"}
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                id="gender-male"
                label="férfi"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                id="gender-female"
                label="nő"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDob">
              <Form.Label>Születési dátum</Form.Label>
              <Form.Control
                type="date"
                {...(readOnly ? { readOnly: true } : {})}
                value={new Date(formData.dob).toISOString().split('T')[0]}
                onChange={handleChange}
                name="dob"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCountry">
              <Form.Label>Ország</Form.Label>
              <Form.Control
                type="text"
                {...(readOnly ? { readOnly: true } : {})}
                value={formData.country}
                onChange={handleChange}
                name="country"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCity">
              <Form.Label>Város</Form.Label>
              <Form.Control
                type="text"
                {...(readOnly ? { readOnly: true } : {})}
                value={formData.city}
                onChange={handleChange}
                name="city"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAddress1">
              <Form.Label>Cím 1.</Form.Label>
              <Form.Control
                type="text"
                {...(readOnly ? { readOnly: true } : {})}
                value={formData.address1}
                onChange={handleChange}
                name="address1"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAddress2">
              <Form.Label>Cím 2.</Form.Label>
              <Form.Control
                type="text"
                {...(readOnly ? { readOnly: true } : {})}
                value={formData.address2}
                onChange={handleChange}
                name="address2"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPostcode">
              <Form.Label>Irányítószám</Form.Label>
              <Form.Control
                type="text"
                {...(readOnly ? { readOnly: true } : {})}
                value={formData.postcode}
                onChange={handleChange}
                name="postcode"
              />
            </Form.Group>
          </Form>{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Bezár
          </Button>
          {!readOnly && (
            <Button variant="primary" onClick={handleSave}>
              Mentés
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserModal;
