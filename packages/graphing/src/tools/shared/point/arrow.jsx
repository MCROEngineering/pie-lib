import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { types } from '@pie-lib/plot';
import { ArrowHead } from '../arrow-head';

export default class Arrow extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    correctness: PropTypes.string,
    disabled: PropTypes.bool,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    angle: PropTypes.number.isRequired,
    graphProps: types.GraphPropsType.isRequired
  };

  render() {
    const {
      classes,
      angle,
      className,
      x,
      y,
      disabled,
      correctness,
      graphProps,
      ...rest
    } = this.props;

    const size = 14;
    const { scale } = graphProps;

    const scaledX = scale.x(x);
    const scaledY = scale.y(y);
    const transform = `translate(${(size / 2) * -1}, ${(size / 2) * -1})
      rotate(${-1 * angle} ${scaledX + size / 2} ${scaledY + size / 2})`;
    const points = `${scaledX},${scaledY}
     ${scaledX + size},${scaledY + size / 2}
      ${scaledX}, ${scaledY + size}`;

    return (
      <g
        className={classNames(
          classes.point,
          disabled && classes.disabled,
          classes[correctness],
          className
        )}
        {...rest}
      >
        <ArrowHead size={size} transform={transform} points={points} />
      </g>
    );
  }
}
