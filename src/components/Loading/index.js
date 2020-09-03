import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';

import './index.scss';

Loading.propTypes = {};

function Loading(props) {
  return (
    <div className="loading-container">
      <Spin size="large" />
    </div>
  );
}

export default Loading;
