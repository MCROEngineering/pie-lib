import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ToolMenu from './tool-menu';
import Graph, { graphPropTypes } from './graph';
import UndoRedo from './undo-redo';

export class GraphWithControls extends React.Component {
  static propTypes = {
    ...graphPropTypes,
    onUndo: PropTypes.func,
    onRedo: PropTypes.func,
    onReset: PropTypes.func
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      currentTool: props.currentTool || props.tools[0].type
    };
  }

  changeCurrentTool = currentTool => {
    this.setState({ currentTool });
  };

  componentDidUpdate() {
    const { tools } = this.props;
    const { currentTool } = this.state;
    const t = tools.find(t => currentTool && t.type === currentTool);

    if ((!t || !t.toolbar) && !!currentTool) {
      this.setState({ currentTool: undefined });
    }
  }

  render() {
    const {
      axesSettings,
      classes,
      className,
      marks,
      backgroundMarks,
      size,
      labels,
      domain,
      range,
      title,
      onChangeMarks,
      onUndo,
      onRedo,
      onReset,
      tools,
      correctnessMarks
    } = this.props;
    const { currentTool, labelModeEnabled } = this.state;

    const enabled = !correctnessMarks;

    return (
      <div className={classNames(classes.graphWithControls, className)}>
        <div className={classes.controls}>
          <ToolMenu
            tools={tools}
            currentTool={currentTool}
            onChange={this.changeCurrentTool}
            labelModeEnabled={labelModeEnabled}
            onToggleLabelMode={() =>
              this.setState({ labelModeEnabled: !this.state.labelModeEnabled })
            }
          />
          {enabled && <UndoRedo onUndo={onUndo} onRedo={onRedo} onReset={onReset} />}
        </div>
        <div ref={r => (this.labelNode = r)} />
        <Graph
          labelModeEnabled={labelModeEnabled}
          size={size}
          domain={domain}
          range={range}
          title={title}
          axesSettings={axesSettings}
          labels={labels}
          marks={correctnessMarks || marks}
          backgroundMarks={backgroundMarks}
          onChangeMarks={enabled ? onChangeMarks : () => {}}
          tools={tools}
          currentTool={currentTool}
        />
      </div>
    );
  }
}
const styles = theme => ({
  graphWithControls: {},
  controls: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.primary.light,
    borderTop: `solid 1px ${theme.palette.primary.dark}`,
    borderBottom: `solid 0px ${theme.palette.primary.dark}`,
    borderLeft: `solid 1px ${theme.palette.primary.dark}`,
    borderRight: `solid 1px ${theme.palette.primary.dark}`
  }
});
export default withStyles(styles)(GraphWithControls);
