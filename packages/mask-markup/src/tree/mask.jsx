import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import Blank from './blank';
import { root } from 'postcss';

const renderChildren = (value, data, onChange, rootRenderChildren) => {
  if (!value) {
    return null;
  }

  // console.log('renderChildren:', value);
  const children = [];
  (value.nodes || []).forEach(n => {
    // console.log('root: render...', rootRenderChildren);
    if (rootRenderChildren) {
      const c = rootRenderChildren(n, data, onChange);
      if (c) {
        children.push(c);
        return;
      }
    }
    // console.log('node:', n, n.data.component);
    // const component = n.data ? n.data.component : undefined;
    // if (component === 'input') {
    //   children.push(
    //     <Input value={data[n.data.id]} onChange={e => onChange(n.data.id, e.target.value)} />
    //   );
    // } else if (component === 'blank') {
    //   console.log('got a blank..---------------------------.');
    //   children.push(<Blank value={data[n.data.id]} id={n.data.id} onChange={onChange} />);
    if (n.type === 'div') {
      children.push(<div>{renderChildren(n, data, onChange, rootRenderChildren)}</div>);
    } else if (n.type === 'span') {
      children.push(<span>{renderChildren(n, data, onChange, rootRenderChildren)}</span>);
    } else if (n.object === 'text') {
      const content = n.leaves.reduce((acc, l) => {
        return acc + l.text;
      }, '');
      children.push(<span>{content}</span>);
    } else if (n.data.component === 'input') {
      children.push(
        <Input value={data[n.data.id]} onChange={e => onChange(n.data.id, e.target.value)} />
      );
    }
  });
  return children;
};

const Container = props => {
  const { value, data, onChange } = props;
  // const Tag = value.type;
  const children = renderChildren(value, data, onChange, props.renderChildren);
  return <div>{children}</div>;
};

export default class Mask extends React.Component {
  static propTypes = {
    value: PropTypes.any,
    renderChildren: PropTypes.func,
    layout: PropTypes.object,
    data: PropTypes.object,
    onChange: PropTypes.func
  };

  handleChange = (id, value) => {
    const data = { ...this.props.data, [id]: value };
    this.props.onChange(data);
  };

  render() {
    const { renderChildren, data, layout } = this.props;
    // console.log('render');
    return (
      <Container
        renderChildren={renderChildren}
        value={layout}
        data={data}
        onChange={this.handleChange}
      />
    );
  }
}
