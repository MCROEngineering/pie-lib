import * as React from 'react';

import Backspace from '@material-ui/icons/Backspace';
import BasicOperatorsPad from './basic-operators';
import Clear from '@material-ui/icons/Clear';
import Down from '@material-ui/icons/KeyboardArrowDown';
import Extras from './extras';
import IconButton from '@material-ui/core/IconButton';
import Left from '@material-ui/icons/KeyboardArrowLeft';
import NumberPad from './number-pad';
import Right from '@material-ui/icons/KeyboardArrowRight';
import Up from '@material-ui/icons/KeyboardArrowUp';
import { buttonStyle } from './styles';
import classNames from 'classnames';
import debug from 'debug';
import merge from 'lodash/merge';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const log = debug('math-input:keypad');

const bs = buttonStyle();

const topRowStyle = {
  root: merge({}, bs.root, {
    backgroundColor: '#eaeadf',
    marginRight: '0'
  }),
  label: bs.label,
  hideRoot: merge({}, bs.root, {
    opacity: 0.0
  })
};

const RawIconButton = props => {
  const root = props.hide ? props.classes.hideRoot : props.classes.root;
  return (
    <IconButton
      onClick={props.onClick}
      tabIndex={'-1'}
      style={props.style}
      classes={{ root, label: props.classes.label }}
    >
      {props.children}
    </IconButton>
  );
};

RawIconButton.propTypes = {
  hide: PropTypes.bool,
  style: PropTypes.object,
  classes: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onClick: PropTypes.func
};

const Tr = withStyles(topRowStyle, { name: 'TR' })(RawIconButton);

const cursor = ['Left', 'Right', 'Up', 'Down'];

const icons = {
  Left: Left,
  Right: Right,
  Up: Up,
  Down: Down
};

const TopRow = props => (
  <div className={props.className}>
    {cursor.map(c => {
      const Icon = icons[c];
      return (
        <Tr hide={props.showingCode} key={c} onClick={() => props.onClick(c)}>
          <Icon />
        </Tr>
      );
    })}
  </div>
);
TopRow.propTypes = {
  className: PropTypes.string,
  showingCode: PropTypes.bool
};

const DeleteAndClear = props => {
  return (
    <div>
      <Tr hide={props.showingCode} onClick={() => props.onClick('Backspace')}>
        <Backspace />
      </Tr>
      <Tr hide={props.showingCode}>
        <Clear onClick={() => props.onClick('clear')} />
      </Tr>
    </div>
  );
};

DeleteAndClear.propTypes = {
  showingCode: PropTypes.bool,
  onClick: PropTypes.func
};

export class Keypad extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onToggleCode: PropTypes.func,
    latex: PropTypes.string,
    classes: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      showCode: false
    };
  }

  onFocus = e => {
    log('onFocus', e);
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  onTopRowClick = value => {
    this.props.onClick({
      value,
      type: 'cursor'
    });
  };

  onNumberPadClick = value => {
    this.props.onClick({
      value
    });
  };

  onBasicOperatorsClick = value => {
    this.props.onClick({
      value
    });
  };

  onExtrasClick = data => {
    this.props.onClick(data);
  };

  toggleCode = () => {
    this.setState({ showCode: !this.state.showCode }, () => {
      this.props.onToggleCode && this.props.onToggleCode();
    });
  };

  render() {
    const { classes } = this.props;
    const { showCode } = this.state;
    const holderClasses = classNames(
      classes.padHolder,
      showCode && classes.hidden
    );

    return (
      <div className={classes.root} onFocus={this.onFocus} tabIndex={'-1'}>
        <div className={holderClasses}>
          <NumberPad onClick={this.onNumberPadClick} />
          <BasicOperatorsPad onClick={this.onBasicOperatorsClick} />
          <Extras onClick={this.onExtrasClick} />
          <TopRow className={classes.topRow} onClick={this.onTopRowClick} />
          <DeleteAndClear onClick={this.onTopRowClick} />
        </div>
      </div>
    );
  }
}

const styles = {
  root: {
    minWidth: '350px',
    display: 'grid',
    gridTemplateRows: '1fr 4fr',
    gridColumnGap: '0px',
    '&:focus': {
      outline: 'none'
    }
  },
  hidden: {
    opacity: 0,
    zIndex: -1
  },
  padHolder: {
    display: 'grid',
    gridColumn: '1/8',
    gridRow: '1/4',
    gridTemplateColumns: '3fr 1fr 4fr 1fr 1fr'
  },
  topRow: {}
};

export default withStyles(styles, { name: 'Keypad' })(Keypad);
