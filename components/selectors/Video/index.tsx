
import { useNode, useEditor, UserComponent } from '@craftjs/core';
import React from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';
import { VideoSettings } from './VideoSettings';

export type YoutubeVideoProps = {
  videoId: string
};


const YoutubeDiv = styled.div<any>`
  width: 100%;
  height: 100%;
  > div {
    height: 100%;
  }
  iframe {
    pointer-events: ${(props) => (props.enabled ? 'none' : 'auto')};
    // width:100%!important;
    // height:100%!important;
  }
`;
export const Video = (props: Partial<YoutubeVideoProps>) => {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const {
    connectors: { connect },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  return (
    <YoutubeDiv ref={connect} enabled={enabled}>
      <YouTube
        videoId={props.videoId}
        opts={{
          width: '100%',
          height: '100%',
        }}
      />
    </YoutubeDiv>
  );
};

Video.craft = {
  displayName: 'Video',
  props: {
    videoId: '',
  },
  related: {
    toolbar: VideoSettings,
  },
};
