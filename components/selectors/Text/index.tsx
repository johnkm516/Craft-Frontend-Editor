
import { useNode, useEditor } from '@craftjs/core';
import React from 'react';
import ContentEditable from 'react-contenteditable';
import { useAppSelector } from 'redux/hooks';
import { TextSettings } from './TextSettings';

export type TextProps = {
  fontSize: string;
  textAlign: string;
  fontWeight: string;
  color: Record<'r' | 'g' | 'b' | 'a', string>;
  shadow: number;
  text: string;
  margin: [string, string, string, string];
  listenNodeID?: string;
};

export const Text = ({
  fontSize,
  textAlign,
  fontWeight,
  color,
  shadow,
  text,
  margin,
  listenNodeID,
}: Partial<TextProps>) => {
  const {
    connectors: { connect },
    actions: { setProp },
  } = useNode();

  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const nodeTreeState: Map<string, string | number> = useAppSelector((state) => (state.Inputs.nodes));
  const value = (listenNodeID && listenNodeID != '' && nodeTreeState.has(listenNodeID)) ? nodeTreeState.get(listenNodeID) as string : undefined;
  if (value) {
    
  }
  const node = useNode();
  return (
    <ContentEditable
      id={node.id}
      innerRef={connect}
      html={value ? value : text!} // innerHTML of the editable div
      disabled={!enabled}
      onChange={(e) => {
        setProp((prop: any) => (prop.text = e.target.value), 500);
      }} // use true to disable editing
      tagName="h2" // Use a custom HTML tag (uses a div by default)
      style={{
        width: '100%',
        margin: `${margin![0]}px ${margin![1]}px ${margin![2]}px ${margin![3]}px`,
        color: `rgba(${Object.values(color!)})`,
        fontSize: `${fontSize}px`,
        textShadow: `0px 0px 2px rgba(0,0,0,${(shadow || 0) / 100})`,
        fontWeight,
        textAlign,
      }}
    />
  );
};

Text.craft = {
  displayName: 'Text',
  props: {
    fontSize: '15',
    textAlign: 'left',
    fontWeight: '500',
    color: { r: 92, g: 90, b: 90, a: 1 },
    margin: [0, 0, 0, 0],
    shadow: 0,
    text: 'Text',
  },
  related: {
    toolbar: TextSettings,
  },
};
