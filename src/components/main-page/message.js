import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {serverUri} from "../../constants";

const Message = ({ message: { url, text, fileType } }) => {
  if (url) {
    if (fileType.startsWith('image/')) {
      return (
        <Fragment>
          <img
            className="message__image"
            src={url}
            alt={text}
          />
          {text && <div className="message__text">{text}</div>}
        </Fragment>
      );
    } else if (fileType.startsWith('audio/')) {
      return (
        <div>
          <audio controls className="message__audio">
            <source src={serverUri + url} type={fileType} />
          </audio>
        </div>
      );
    }
  }
  return <div className="message__text">{text}</div>;
};

Message.propTypes = {
  message: PropTypes.object
};

export default Message;
