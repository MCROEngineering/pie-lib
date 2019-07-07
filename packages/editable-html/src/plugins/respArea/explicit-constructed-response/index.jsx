import React from 'react';

export default ({ attributes, value }) => {
  return (
    <span
      {...attributes}
      style={{
        display: 'inline-flex',
        minHeight: '50px',
        minWidth: '178px',
        position: 'relative',
        margin: '0 5px',
        cursor: 'pointer'
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          minWidth: '178px',
          minHeight: '36px',
          height: '36px',
          background: '#FFF',
          border: '1px solid #C0C3CF',
          boxSizing: 'border-box',
          borderRadius: '3px',
          overflow: 'hidden',
          padding: '8px'
        }}
        dangerouslySetInnerHTML={{
          __html: value || '<div>&nbsp;</div>'
        }}
      />
    </span>
  );
};