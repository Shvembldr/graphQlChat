import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import DropFile from '../modal-components/drop-file'
import {connect} from "react-redux";
import {showModal} from "../../redux/actions/modal";

class ChatFileUpload extends Component {
  static propTypes = {
    channelId: PropTypes.number,
    userId: PropTypes.number,
    showModal: PropTypes.func,
  };

  sendFile = async ([file]) => {
    const modalComponent = <DropFile
      channelId={this.props.channelId}
      userId={this.props.userId}
      file={file}
    />;
    this.props.showModal(modalComponent)
  };

  render() {
    const { children } = this.props;
    return (
      <Dropzone
        className="chat__window"
        onDrop={this.sendFile}
        disableClick={true}
      >
        {children}
      </Dropzone>
    );
  }
}


export default connect(null, { showModal })(ChatFileUpload);
