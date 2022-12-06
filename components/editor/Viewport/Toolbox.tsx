
import { EditorState, Element, useEditor } from '@craftjs/core';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import React from 'react';
import styled from 'styled-components';

//Component Icons

import IndeterminateCheckBoxRoundedIcon from '@mui/icons-material/IndeterminateCheckBoxRounded';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TableViewIcon from '@mui/icons-material/TableView';

//Component classes
import { Button }   from '../../selectors/Button';
import { Container } from '../../selectors/Container';
import { Text } from '../../selectors/Text';
import { Video } from '../../selectors/Video';
import { DataGridComponent } from '../../selectors/DataGrid';



const ToolboxDiv = styled.div<{ enabled: boolean }>`
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  ${(props) => (!props.enabled ? `width: 0;` : '')}
  ${(props) => (!props.enabled ? `opacity: 0;` : '')}
`;

const Item = styled.a<{ move?: boolean }>`
  svg {
    width: 22px;
    height: 22px;
    fill: #707070;
  }
  ${(props) =>
    props.move &&
    `
    cursor: move;
  `}
`;

export const Toolbox = () => {
  const {
    enabled,
    connectors: { create },
  } = useEditor((state: EditorState) => ({
    enabled: state.options.enabled,
  }));

  return (
    <ToolboxDiv
      enabled={enabled && enabled}
      className="toolbox transition w-12 h-full flex flex-col bg-white"
    >
      <div className="flex flex-1 flex-col items-center pt-3">
        <div
          ref={(ref) =>
            create(
              ref!,
              <Element
                canvas
                is={Container}
                background={{ r: 78, g: 78, b: 78, a: 1 }}
                color={{ r: 0, g: 0, b: 0, a: 1 }}
              ></Element>
            )
          }
        >
          <Tooltip title="Container" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <CropSquareIcon />
            </Item>
          </Tooltip>
        </div>
        <div
          ref={(ref) =>
            create(ref!, <Text fontSize="12" textAlign="left" text="Hi there" />)
          }
        >
          <Tooltip title="Text" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <TextFieldsIcon />
            </Item>
          </Tooltip>
        </div>
        <div ref={(ref) => create(ref!, <Button />)}>
          <Tooltip title="Button" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <IndeterminateCheckBoxRoundedIcon />
            </Item>
          </Tooltip>
        </div>
        <div ref={(ref) => create(ref!, <Video />)}>
          <Tooltip title="Video" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <YouTubeIcon />
            </Item>
          </Tooltip>
        </div>
        <div ref={(ref) => create(ref!, <DataGridComponent />)}>
          <Tooltip title="Data Grid" placement="right">
            <Item className="m-2 pb-2 cursor-pointer block" move>
              <TableViewIcon />
            </Item>
          </Tooltip>
        </div>
      </div>
    </ToolboxDiv>
  );
};
