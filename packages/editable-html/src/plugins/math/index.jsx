import Functions from '@material-ui/icons/Functions';
import { Inline } from 'slate';
import { MathPreview, MathToolbar } from '@pie-lib/math-toolbar';
import { wrapMath, unWrapMath } from '@pie-lib/math-rendering';
import React from 'react';
import debug from 'debug';
import SlatePropTypes from 'slate-prop-types';
import PropTypes from 'prop-types';
const log = debug('@pie-lib:editable-html:plugins:math');

const TEXT_NODE = 3;

export const CustomToolbarComp = React.memo(
  props => {
    const { node, value, onFocus, onBlur, onClick } = props;

    const onDone = (latex, b) => {
      const update = {
        ...node.data.toObject(),
        latex
      };
      const change = value.change().setNodeByKey(node.key, { data: update });

      const nextText = value.document.getNextText(node.key);

      change.moveFocusTo(nextText.key, 0).moveAnchorTo(nextText.key, 0);

      props.onToolbarDone(change, false);
    };

    const onChange = latex => {
      const update = {
        ...node.data.toObject(),
        latex
      };
      const change = value.change().setNodeByKey(node.key, { data: update });
      log('call onToolbarChange:', change);
      props.onDataChange(node.key, update);
    };

    const latex = node.data.get('latex');

    return (
      <MathToolbar
        autoFocus
        latex={latex}
        onChange={onChange}
        onDone={onDone}
        onBlur={onBlur}
        onFocus={onFocus}
        onClick={onClick}
      />
    );
  },
  (prev, next) => {
    const equal = prev.node.equals(next.node);
    return equal;
  }
);

CustomToolbarComp.propTypes = {
  node: SlatePropTypes.node.isRequired,
  value: SlatePropTypes.value,
  onToolbarDone: PropTypes.func,
  onDataChange: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  onBlur: PropTypes.func
};

export default function MathPlugin(opts) {
  return {
    name: 'math',
    toolbar: {
      icon: <Functions />,
      onClick: (value, onChange) => {
        log('[insertMath]');
        const math = inlineMath();
        const change = value.change().insertInline(math);
        onChange(change);
      },
      supports: node => node && node.object === 'inline' && node.type === 'math',
      /**
       * Return a react component function
       * @param node {Slate.Node}
       * @param value {Slate.Value}
       * @param onDone {(change?: Slate.Change, finishEditing :boolea) => void} - a function to call once the toolbar
       *   has made any changes, call with the node.key and a data object.
       */
      CustomToolbarComp
    },
    schema: {
      document: { match: [{ type: 'math' }] }
    },

    pluginStyles: (node, parentNode, p) => {
      if (p) {
        return {
          position: 'absolute',
          top: 'initial'
        };
      }
    },

    renderNode: props => {
      if (props.node.type === 'math') {
        log('[renderNode]: data:', props.node.data);
        return <MathPreview {...props} />;
      }

      if (props.node.type === 'mathml') {
        const html = props.node.data.get('html');

        return (
          <div
            dangerouslySetInnerHTML={{
              __html: html
            }}
          />
        );
      }
    }
  };
}

MathPlugin.ROUND_BRACKETS = 'round_brackets';
MathPlugin.SQUARE_BRACKETS = 'square_brackets';
MathPlugin.DOLLAR = 'dollar';
MathPlugin.DOUBLE_DOLLAR = 'double_dollar';

export const inlineMath = () =>
  Inline.create({
    object: 'inline',
    type: 'math',
    isVoid: true,
    data: {
      latex: ''
    }
  });

const htmlDecode = input => {
  const doc = new DOMParser().parseFromString(input, 'text/html');

  return doc.documentElement.textContent;
};

export const serialization = {
  deserialize(el) {
    const tagName = el.tagName.toLowerCase();
    log('[deserialize] name: ', tagName);

    if (tagName === 'math') {
      return {
        object: 'block',
        isVoid: true,
        type: 'mathml',
        data: {
          html: el.outerHTML
        }
      };
    }

    if (el.nodeType === TEXT_NODE) {
      return;
    }

    if (tagName !== 'span') {
      return;
    }

    const hasLatex = el.hasAttribute('data-latex') || el.hasAttribute('latex');

    if (hasLatex) {
      const latex = htmlDecode(el.innerHTML);
      const { unwrapped, wrapType } = unWrapMath(latex);
      log('[deserialize]: noBrackets: ', unwrapped, wrapType);
      return {
        object: 'inline',
        type: 'math',
        isVoid: true,
        nodes: [],
        data: {
          latex: unwrapped,
          wrapper: wrapType
        }
      };
    }
  },
  serialize(object) {
    if (object.type === 'math') {
      const l = object.data.get('latex');
      const wrapper = object.data.get('wrapper');
      log('[serialize] latex: ', l);
      const decoded = htmlDecode(l);
      return (
        <span data-latex="" data-raw={decoded}>
          {wrapMath(decoded, wrapper)}
        </span>
      );
    }

    if (object.type === 'mathml') {
      const html = object.data.get('html');

      return (
        <span
          contentEditable={false}
          suppressContentEditableWarning
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }
  }
};
