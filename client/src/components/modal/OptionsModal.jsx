import React from "react";
import Modal from "../modal/Modal";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import { Divider, Column, ReportBtn, Button } from "../../styles/Global";
import {
  OptionsModalStyle,
  OptionsModalContent,
  OptionsModalBody,
  OptionsModalFooter,
} from "./modal.style";

const OptionsModal = ({ logout }) => {
  return (
    <Modal title="Options" id="optionsModal">
      <OptionsModalStyle>
        <OptionsModalContent>
          <OptionsModalBody>
            <Column>
              <ReportBtn
                href="https://github.com/notey-app/notey.app/issues/new?assignees=Dev-CasperTheGhost&labels=bug&template=bug_report.md&title=%5BBUG%5D+"
                target="_blank"
                rel="noreferrer noopener"
              >
                Report a bug
              </ReportBtn>
              <ReportBtn
                href="https://github.com/notey-app/notey.app/issues"
                target="_blank"
                rel="noreferrer noopener"
              >
                Request a feature
              </ReportBtn>
              <ReportBtn
                href="https://github.com/notey-app/notey.app/LICENSE.md"
                target="_blank"
                rel="noreferrer noopener"
              >
                License
              </ReportBtn>
              <Button danger onClick={logout}>
                Logout
              </Button>
              <Divider
                style={{ marginTop: "10px", marginBottom: "10px" }}
              ></Divider>

              <h3 style={{ textAlign: "center", paddingBottom: "10px" }}>
                Icons are from{" "}
                <a href="https://icons.getbootstrap.com/">Bootstrap</a>
              </h3>
            </Column>
          </OptionsModalBody>
          <OptionsModalFooter>
            Made with ❤ by{" "}
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://caspertheghost.me"
            >
              CasperTheGhost
            </a>{" "}
            on{" "}
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://github.com/notey-app/notey.app"
            >
              Github
            </a>
          </OptionsModalFooter>
        </OptionsModalContent>
      </OptionsModalStyle>
    </Modal>
  );
};

export default connect(null, { logout })(OptionsModal);
