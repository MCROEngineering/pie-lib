import React from 'react';
import PropTypes from 'prop-types';
import componentize from './componentize';
import { deserialize } from './serialization';
import Mask from './tree/mask';
import Choices from './choices';
import Blank from './tree/blank';

export const buildLayoutFromMarkup = markup => {
  const { ids, markup: processed } = componentize(markup, 'blank');
  const value = deserialize(processed);
  return value.document;
};

export default class DragInTheBlank extends React.Component {
  static propTypes = {
    markup: PropTypes.string,
    layout: PropTypes.object,
    choices: PropTypes.arrayOf(
      PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })
    ),
    value: PropTypes.object,
    onChange: PropTypes.func
  };

  renderChildren = (node, data, onChange) => {
    const component = node.data ? node.data.component : undefined;
    if (component === 'blank') {
      return (
        <Blank
          disabled={this.props.disabled}
          value={data[node.data.id]}
          id={node.data.id}
          onChange={onChange}
        />
      );
    }
  };

  render() {
    const { markup, layout, value, onChange, choices, disabled } = this.props;

    const maskLayout = layout ? layout : buildLayoutFromMarkup(markup);

    return (
      <div>
        <Choices value={choices} disabled={disabled} />
        <Mask
          layout={maskLayout}
          data={value}
          onChange={onChange}
          renderChildren={this.renderChildren}
        />
      </div>
    );
  }
}
