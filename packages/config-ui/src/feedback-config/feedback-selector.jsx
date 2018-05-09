import EditableHTML from '@pie-lib/editable-html';
import InputContainer from '../input-container';
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from 'material-ui/styles';
import Group from './group';

const feedbackLabels = {
  default: 'Simple Feedback',
  none: 'No Feedback',
  custom: 'Customized Feedback'
};
const holder = (theme, extras) => ({
  marginTop: '0px',
  background: '#e0dee0',
  padding: theme.spacing.unit * 0.9,
  marginBottom: theme.spacing.unit * 2,
  ...extras
});

const style = theme => ({
  feedbackSelector: {
    marginBottom: theme.spacing.unit
  },
  label: {
    cursor: 'pointer'
  },
  inputContainerLabel: {
    transform: 'translateY(-20%)'
  },
  feedbackInputContainer: {
    paddingBottom: 0
  },
  customHolder: holder(theme, {
    background: '#e0dee0',
    padding: 0
  }),
  defaultHolder: holder(theme, {
    fontFamily: theme.typography.fontFamily,
    cursor: 'default'
  }),
  editor: {
    fontFamily: theme.typography.fontFamily
  },
  group: {
    paddingTop: theme.spacing.unit
  }
});

class FeedbackSelector extends React.Component {
  static propTypes = {
    keys: PropTypes.arrayOf(PropTypes.string),
    classes: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    feedback: PropTypes.shape({
      type: PropTypes.oneOf(['default', 'none', 'custom']).isRequired,
      customFeedback: PropTypes.string,
      default: PropTypes.string.isRequired
    }),
    onFeedbackChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  onTypeChange = type => {
    this.props.onFeedbackChange(Object.assign(this.props.feedback, { type }));
  };

  onCustomFeedbackChange = customFeedback => {
    this.props.onFeedbackChange(
      Object.assign(this.props.feedback, { customFeedback })
    );
  };

  render() {
    const { keys, classes, label, feedback } = this.props;

    let feedbackKeys = keys || Object.keys(feedbackLabels);

    return (
      <div className={classes.feedbackSelector}>
        <InputContainer
          label={label}
          className={classes.feedbackInputContainer}
          extraClasses={{ label: classes.inputContainerLabel }}
        >
          <Group
            className={classes.group}
            keys={feedbackKeys}
            label={label}
            value={feedback.type}
            handleChange={this.onTypeChange}
            feedbackLabels={feedbackLabels}
          />
        </InputContainer>
        {feedback.type === 'custom' && (
          <div className={classes.customHolder}>
            <EditableHTML
              className={classes.editor}
              onChange={this.onCustomFeedbackChange}
              markup={feedback.customFeedback || ''}
            />
          </div>
        )}
        {feedback.type === 'default' && (
          <div className={classes.defaultHolder}> {feedback.default}</div>
        )}
      </div>
    );
  }
}

export default withStyles(style)(FeedbackSelector);
