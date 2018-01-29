import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {showSidebar} from "../../redux/actions/sidebar";

class ChatHeader extends Component {
  static propTypes = {
    showSidebar: PropTypes.func
  };

  render() {
    const { showSidebar } = this.props;
    return (
      <header className="chat__header header">
        <div className="header__show-sidebar" onClick={showSidebar}>

        </div>
      </header>

    );
  }
}


export default connect(null, { showSidebar })(ChatHeader);
