import React, { useCallback, useEffect, useRef, useState } from 'react';
import VisibilitySensor from '@svanboxel/visibility-sensor-react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { ViewStyle } from 'react-native';

type videoProps = {
  source: string,
  mute?: boolean,
  style: ViewStyle | ViewStyle[]
}
export default function VideoPlayer({ mute = true, source, style }: videoProps) {


  //for volume
  const [muted, setMuted] = useState(mute);
  const [isOnScreen, setIsOnScreen] = useState(false);
  const [status, setStatus] = useState<'error' | 'idle' | 'loading' | 'readyToPlay'>('loading');

  const error = status == 'error' ? "could'nt play video" : null;



  const ref = useRef(null);
  // const [isPlaying, setIsPlaying] = useState(true);
  const player = useVideoPlayer(source, player => {
    // player.loop = true;
    player.play();
    player.muted = muted;
  });

  const onChange = (isOnScreen: boolean) => {
    if (isOnScreen) {
      player.play();
      setIsOnScreen(isOnScreen);
    }
    else {
      player.pause();
      setIsOnScreen(isOnScreen);
    }
  }

  useEffect(() => {
    player.muted = muted;
  }, [muted]);

  useEffect(() => {
    // const subscription = player.addListener('playingChange', isPlaying => {
    //     setIsPlaying(isPlaying);
    // });

    const statusSubscription = player.addListener('statusChange', status => {
      setStatus(status);
    });

    return () => {
      // subscription.remove();
      statusSubscription.remove();
    };
  }, [player]);

  const RenderVideo = useCallback(() =>
    isOnScreen ? (
      <VideoView
        ref={ref}
        style={style}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
    ) : null, [isOnScreen])


  return (
    <VisibilitySensor onChange={onChange}>
      <RenderVideo />
    </VisibilitySensor>
  )
}

