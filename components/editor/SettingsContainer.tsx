import { useEditor } from '@craftjs/core';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import styled from 'styled-components';

const SettingsWrapper = styled.div`
  overflow: hidden;
  padding: 15px;
  margin-bottom: 15px;
`;

/**
 * @class SettingsContainer
 *
 * 配置项容器。
 *
 * @author 大漠穷秋<damoqiongqiu@126.com>
 */
export const SettingsContainer = (props: any) => {
  const { active, related } = useEditor((state, query) => {
    const currentlySelectedNodeId = query.getEvent('selected').first();
    return {
      active: currentlySelectedNodeId,
      related: currentlySelectedNodeId && state.nodes[currentlySelectedNodeId].related,
    };
  });

  return (
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={50}
      autoHeight
      autoHeightMin={0}
      autoHeightMax={'calc(100vh - 44px)'}
      thumbMinSize={30}
    >
      <SettingsWrapper>
        {active && related.toolbar && React.createElement(related.toolbar)}
        {!active && (
          <div
            style={{
              color: '#938787',
              fontWeight: '500',
              fontSize: '14px',
            }}
          >
            Click on a component to edit its properties.
          </div>
        )}
      </SettingsWrapper>
    </Scrollbars>
  );
};
