import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Message = ({ message: { url, text, fileType } }) => {
  if (url) {
    if (fileType.startsWith('image/')) {
      return (
        <Fragment>
          <img
            className="message__image"
            src={`http://localhost:4000/${url}`}
            alt={text}
          />
          {text && <div className="message__text">{text}</div>}
        </Fragment>
      );
    } else if (fileType.startsWith('audio/')) {
      //   else if (filetype === 'text/plain') {
      //   return <RenderText url={url} />;
      // }
      return (
        <div>
          <audio controls className="message__audio">
            <source src={`http://localhost:4000/${url}`} type={fileType} />
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
