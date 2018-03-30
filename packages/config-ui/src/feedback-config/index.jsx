import FeedbackSelector from './feedback-selector';
import FormSection from '../form-section';
import PropTypes from 'prop-types';
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { withStyles } from 'material-ui/styles';

export { FeedbackSelector };

const style = {};

export const buildDefaults = input =>
  Object.assign(
    {},
    {
      correctFeedbackType: 'default',
      incorrectFeedbackType: 'default',
      partialFeedbackType: 'default'
    },
    input
  );

export class FeedbackConfig extends React.Component {
  constructor(props) {
    super(props);
    this.onCorrectChange = this.onChange.bind(this, 'correct');
    this.onIncorrectChange = this.onChange.bind(this, 'incorrect');
    this.onPartialChange = this.onChange.bind(this, 'partial');
  }

  onChange(key, data) {
    const { defaults, onChange, feedback } = this.props;
    const { type, customFeedback } = data;
    const out = cloneDeep(feedback);
    out[`${key}FeedbackType`] = type;
    out[`${key}Feedback`] =
      type === 'custom'
        ? customFeedback
        : type === 'default' ? defaults[key] : '';
    onChange(out);
  }

  mkModel(key) {
    const { feedback, defaults } = this.props;
    return {
      type: feedback[`${key}FeedbackType`],
      default: defaults[key],
      customFeedback: feedback[`${key}Feedback`]
    };
  }

  render() {
    const { allowPartial } = this.props;

    const correct = this.mkModel('correct');
    const incorrect = this.mkModel('incorrect');
    const partial = allowPartial && this.mkModel('partial');

    return (
      <FormSection label="Feedback">
        <FeedbackSelector
          label="If correct, show"
          feedback={correct}
          onFeedbackChange={this.onCorrectChange}
        />
        {allowPartial && (
          <FeedbackSelector
            label="If partially correct, show"
            feedback={partial}
            onFeedbackChange={this.onPartialChange}
          />
        )}
        <FeedbackSelector
          label="If incorrect, show"
          feedback={incorrect}
          onFeedbackChange={this.onIncorrectChange}
        />
      </FormSection>
    );
  }
}

FeedbackConfig.propTypes = {
  allowPartial: PropTypes.bool,
  defaults: PropTypes.shape({
    correct: PropTypes.string.isRequired,
    incorrect: PropTypes.string.isRequired,
    partial: PropTypes.string
  }),
  feedback: PropTypes.shape({
    correctFeedback: PropTypes.string,
    correctFeedbackType: PropTypes.string,
    incorrectFeedback: PropTypes.string,
    incorrectFeedbackType: PropTypes.string,
    defaultFeedback: PropTypes.string,
    defaultFeedbackType: PropTypes.string
  }),
  onChange: PropTypes.func.isRequired
};

FeedbackConfig.defaultProps = {
  allowPartial: true,
  defaults: {
    correct: 'Correct',
    incorrect: 'Incorrect',
    partial: 'Nearly'
  },
  feedback: {
    correctFeedback: '',
    correctFeedbackType: 'default',
    incorrectFeedback: '',
    incorrectFeedbackType: 'default',
    partialFeedback: '',
    partialFeedbackType: 'default'
  }
};

export default withStyles(style, { name: 'FeedbackConfig' })(FeedbackConfig);
