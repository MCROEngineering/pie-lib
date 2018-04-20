import { configure, shallow } from 'enzyme';

import { Data } from 'slate';
import { ImageToolbar } from '../image-toolbar';
import MockChange from './mock-change';
import React from 'react';

test('onChange is called on button click', () => {
  const onChange = jest.fn();
  const node = {
    key: 1,
    data: Data.create({ resizePercent: 100 })
  };

  const change = new MockChange();

  const value = {
    change: jest.fn().mockReturnValue(change)
  };

  const toolbar = shallow(
    <ImageToolbar node={node} value={value} classes={{}} onChange={onChange} />
  );

  const tbs = toolbar.find('[percent=25]');

  tbs.simulate('click');
  expect(change.setNodeByKey).toBeCalledWith(1, { data: expect.anything() });
  expect(onChange).toBeCalledWith(change);
});