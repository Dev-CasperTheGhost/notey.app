import * as React from "react";
import { connect } from "react-redux";
import Modal from "@components/modal/Modal";
import useModalEvent from "@hooks/useModalEvent";
import { closeModal } from "@lib/utils";
import { ModalIds } from "@lib/constants";
import { FormGroup, FormInput, FormLabel, SubmitBtn } from "@styles/Auth";
import Loader from "@components/loader/Loader";
import { updatePinCode } from "@actions/auth";

interface Props {
  updatePinCode: (pin: string) => Promise<boolean>;
}

const ChangePinModal: React.FC<Props> = ({ updatePinCode }) => {
  const [pin, setPin] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const inputRef = useModalEvent<HTMLInputElement>(ModalIds.ChangePin);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const success = await updatePinCode(pin.slice(0, 8));

    if (success) {
      closeModal(ModalIds.ChangePin);
    }

    setLoading(false);
  }

  return (
    <Modal style={{ zIndex: "50" }} title="Change PIN" id={ModalIds.ChangePin}>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <FormLabel htmlFor="new_pin_code">New Pin Code</FormLabel>
          <FormInput
            ref={inputRef}
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            id="new_pin_code"
            maxLength={8}
            required
            autoComplete="off"
          />
        </FormGroup>
        <FormGroup>
          <SubmitBtn disabled={!pin || loading} type="submit">
            {loading ? <Loader /> : "Submit"}
          </SubmitBtn>
        </FormGroup>
      </form>
    </Modal>
  );
};

export default connect(null, { updatePinCode })(ChangePinModal);
