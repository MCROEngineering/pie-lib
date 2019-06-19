import { lineToolComponent, lineBase, styles } from '../shared/line';
import React from 'react';
import PropTypes from 'prop-types';
import { ArrowMarker, genUid } from '../shared/arrow-head';
import { trig, types } from '@pie-lib/plot';
import debug from 'debug';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const log = debug('pie-lib:graphing:ray-two');

const markerId = genUid();

const rayStyles = theme => ({
  line: styles.line(theme),
  enabledArrow: styles.arrow(theme),
  disabledArrow: styles.disabledArrow(theme),
  disabled: styles.disabled(theme),
  correct: styles.correct(theme, 'stroke'),
  correctArrow: styles.correct(theme),
  incorrect: styles.incorrect(theme, 'stroke'),
  incorrectArrow: styles.incorrect(theme)
});
export const RayLine = props => {
  const { graphProps, from, to, classes, disabled, correctness, className, ...rest } = props;
  const { scale } = graphProps;
  const [aToB] = trig.edges(graphProps.domain, graphProps.range)(from, to);
  const suffix = correctness || (disabled && 'disabled') || 'enabled';

  return (
    <g>
      <defs>
        <ArrowMarker
          id={`${props.markerId || markerId}-${suffix}`}
          className={classNames(classes[`${suffix}Arrow`])}
        />
      </defs>
      <line
        x1={scale.x(from.x)}
        y1={scale.y(from.y)}
        x2={scale.x(aToB.x)}
        y2={scale.y(aToB.y)}
        {...rest}
        className={classNames(
          classes.line,
          disabled && classes.disabled,
          classes[correctness],
          className
        )}
        markerEnd={`url(#${props.markerId || markerId}-${suffix})`}
      />
    </g>
  );
};

RayLine.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  correctness: PropTypes.string,
  graphProps: PropTypes.any,
  from: types.PointType,
  to: types.PointType,
  markerId: PropTypes.string
};

const StyledRay = withStyles(rayStyles)(RayLine);

const Ray = lineBase(StyledRay);
const Component = lineToolComponent(Ray);

export default Component;