import React from 'react';
import Component from '../src/index';

var config = {
  data: [
    {
      value: '1',
      text: 'tianxiang.wly',
      index: 'T'
    }, {
      value: '2',
      text: 'zhuofeng.ls',
      index: 'Z'
    }, {
      value: '3',
      text: 'yicheng.xrt',
      index: 'Y'
    }
  ],
  title: 'some title',
  value: '1',
  name: 'bibibababong',
  onChange: function(value) {
    console.log(value);
  },
  onSearchChange: function(value) {
    console.log(value);
  }
};

React.render(<Component {...config}/>, document.getElementById('demo'));
