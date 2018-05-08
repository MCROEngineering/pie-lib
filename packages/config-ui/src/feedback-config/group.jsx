import PropTypes from 'prop-types';
import RadioWithLabel from '../radio-with-label';
import React from 'react';
import debug from 'debug';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

const log = debug('config-ui:feedback-config:feedback-selector');

const styles = theme => ({
  radioLabel: {
    fontSize: '12px'
  },
  choice: {
    display: 'flex',
    alignItems: 'center'
  },
  choiceHolder: {
    display: 'flex',
    alignItems: 'center'
  }
});

const Group = ({
  feedbackLabels,
  value,
  classes,
  className,
  handleChange,
  keys
}) => (
  <div className={classNames(classes.choiceHolder, className)}>
    {keys.map(key => {
      return (
        <div className={classes.choice} key={key}>
          <RadioWithLabel
            value={key}
            checked={value === key}
            classes={{
              label: classes.radioLabel
            }}
            onChange={e => handleChange(e.currentTarget.value)}
            label={feedbackLabels[key]}
          />
        </div>
      );
    })}
  </div>
);

Group.propTypes = {
  feedbackLabels: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  keys: PropTypes.arrayOf(PropTypes.string),
  handleChange: PropTypes.func
};

export default withStyles(styles)(Group);