
import React from 'react';

import { ToolbarSection, ToolbarItem, ToolbarTextInput } from '../../editor';
import { ToolbarRadio } from '../../editor/Toolbar/ToolbarItems/ToolbarRadio';

export const DataGridSettings = () => {
  return (
    <React.Fragment>
      <ToolbarSection
        title="Dimensions"
        props={['width', 'height']}
        summary={({ width, height }: any) => {
          return `${width || 0} x ${height || 0}`;
        }}
      >
        <ToolbarItem propKey="width" type="text" label="Width" />
        <ToolbarItem propKey="height" type="text" label="Height" />
      </ToolbarSection>
      <ToolbarSection
        title="Colors"
        props={['background']}
        summary={({ background }: any) => {
          return (
            <div className="flex flex-row-reverse">
              <div
                style={{
                  background:
                    background && `rgba(${Object.values(background)})`,
                }}
                className="shadow-md flex-end w-6 h-6 text-center flex items-center rounded-full bg-black"
              >
              </div>
            </div>
          );
        }}
      >
        <ToolbarItem
          full={true}
          propKey="background"
          type="bg"
          label="Background"
        />
      </ToolbarSection>
      <ToolbarSection
        title="Margin"
        props={['margin']}
        summary={({ margin }: any) => {
          return `${margin[0] || 0}px ${margin[1] || 0}px ${margin[2] || 0}px ${
            margin[3] || 0
          }px`;
        }}
      >
        <ToolbarItem propKey="margin" index={0} type="slider" label="Top" />
        <ToolbarItem propKey="margin" index={1} type="slider" label="Right" />
        <ToolbarItem propKey="margin" index={2} type="slider" label="Bottom" />
        <ToolbarItem propKey="margin" index={3} type="slider" label="Left" />
      </ToolbarSection>
      <ToolbarSection
        title="Padding"
        props={['padding']}
        summary={({ padding }: any) => {
          return `${padding[0] || 0}px ${padding[1] || 0}px ${
            padding[2] || 0
          }px ${padding[3] || 0}px`;
        }}
      >
        <ToolbarItem propKey="padding" index={0} type="slider" label="Top" />
        <ToolbarItem propKey="padding" index={1} type="slider" label="Right" />
        <ToolbarItem propKey="padding" index={2} type="slider" label="Bottom" />
        <ToolbarItem propKey="padding" index={3} type="slider" label="Left" />
      </ToolbarSection>
      <ToolbarSection title="Alignment">
        <ToolbarItem
          propKey="flexDirection"
          type="radio"
          label="Flex Direction"
        >
          <ToolbarRadio value="row" label="Row" />
          <ToolbarRadio value="column" label="Column" />
        </ToolbarItem>
        <ToolbarItem propKey="fillSpace" type="radio" label="Fill space">
          <ToolbarRadio value="yes" label="Yes" />
          <ToolbarRadio value="no" label="No" />
        </ToolbarItem>
        <ToolbarItem propKey="alignItems" type="radio" label="Align Items">
          <ToolbarRadio value="flex-start" label="Flex start" />
          <ToolbarRadio value="center" label="Center" />
          <ToolbarRadio value="flex-end" label="Flex end" />
        </ToolbarItem>
        <ToolbarItem
          propKey="justifyContent"
          type="radio"
          label="Justify Content"
        >
          <ToolbarRadio value="flex-start" label="Flex start" />
          <ToolbarRadio value="center" label="Center" />
          <ToolbarRadio value="flex-end" label="Flex end" />
        </ToolbarItem>
      </ToolbarSection>
      <ToolbarSection title="GraphQL">
        <ToolbarItem propKey="graphQLQuery" type="text" label="GraphQL Query" full={true} multiline={true} />
      </ToolbarSection>

    </React.Fragment>
  );
};
