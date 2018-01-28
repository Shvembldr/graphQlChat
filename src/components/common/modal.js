import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hideModal } from '../../redux/actions/modal';

class Modal extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    component: PropTypes.element,
    hideModal: PropTypes.func,
  };

  componentDidMount = () => {
    if (this.props.onClose) {
      window.addEventListener('keydown', this.listenKeyboard, true);
    }
  };

  componentWillUnmount = () => {
    if (this.props.onClose) {
      window.removeEventListener('keydown', this.listenKeyboard, true);
    }
  };

  onOverlayClick = () => {
    this.props.hideModal();
  };

  listenKeyboard = event => {
    if (event.key === 'Escape' || event.keyCode === 27) {
      this.props.hideModal();
    }
  };

  render() {
    const { isVisible, component } = this.props;
    return (
      isVisible && (
        <Fragment>
          <div className="modal__overlay" onClick={this.onOverlayClick} />
          <div className="modal__content">{component}</div>
        </Fragment>
      )
    );
  }
}

export default connect(
  state => ({
    isVisible: state.modal.isVisible,
    component: state.modal.component,
  }),
  { hideModal },
)(Modal);
