import React, { useCallback, useState } from 'react';
import Video, { VideoProperties } from 'react-native-video';
import VisibilitySensor from '@svanboxel/visibility-sensor-react-native';


export default function VideoPlayer(props: VideoProperties) {
  //holds value if visible in screen or not
  const [isOnScreen, setIsOnScreen] = useState(false);

  const onChange = useCallback((isVisible: boolean) => {
    setIsOnScreen(isVisible);
  }, []);

  return (
    <VisibilitySensor
      onChange={onChange}>
      <Video
        {...props}
        paused={!isOnScreen}
      />
    </VisibilitySensor>
  )
}

