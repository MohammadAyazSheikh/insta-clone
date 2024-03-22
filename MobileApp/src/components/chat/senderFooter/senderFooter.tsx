import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import responsiveStyles from './styles/styles';
import { useFunctionalOrientation } from '../../../utils/functions/responsiveUtils';
import ButtonRipple from '../../general/customButton/buttonRipple';
import { useAppSelector } from '../../../redux/hooks';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconFe from 'react-native-vector-icons/Feather';
import { Image as ImageType, openCamera } from 'react-native-image-crop-picker';
import AttachmentSheet from './attachmentSheet';
import VoiceNoteSheet from '../../general/audioSheet/audioSheet';
import { DocumentPickerResponse } from 'react-native-document-picker';
import VideoPlayerModal from '../../general/videoPlayer/videoPlayerModal';
import { pickSingleVideo } from '../../../utils/functions/imagePicker';
import { coordType, messageObjType } from '../../../constants/types/sharedTypes';
import uuid from 'react-native-uuid';
import ImageListFooter from '../imageListFooter/imageListFooter';
import DocumentPickerFooter from '../documentPickerFooter/documentPickerFooter';
import ReplyMessageFooter from '../replyFooter/replyMessageFooter';
import Animated, {  FadeInDown } from 'react-native-reanimated';
import LocationMapSelector from '../../general/locationSelector/locationMapSelector';

export type conversationStatProps = {

}

export type senderFooterProps = {
  onSend?: (text: messageObjType) => void,
  onTextChange?: (text: string) => void,
  replyMessage?: messageObjType,
  setReplyMessage?: React.Dispatch<React.SetStateAction<messageObjType | undefined>>
} & conversationStatProps

export const SenderFooter = ({
  replyMessage,
  setReplyMessage,
  onSend,
  onTextChange
}: senderFooterProps) => {

  const { user } = useAppSelector(state => state.user);
  // const { theme } = useAppSelector(state => state.theme);
  const { styles } = useFunctionalOrientation(responsiveStyles);
  const [text, setText] = useState<string>('');
  const [isAttachVisible, setIsAttachVisible] = useState(false);




  // location
  const [coord, setCoord] = useState<coordType>({
    latitude: 24.8607,
    longitude: 67.0011
  });
  const [openLocation, setOpenLocation] = useState(false);
  // document
  const [document, setDocument] = useState<DocumentPickerResponse>();
  // image list
  const [imageList, setImageList] = useState<ImageType[]>([])
  // video
  const [showVideo, setShowVideo] = useState(false);
  const [video, setVideo] = useState<string>('');
  // voice
  const [isVoiceVisible, setIsVoiceVisible] = useState(false);
  //always assign default path otherwise it will through error 
  const [voicePath, setVoicePath] =
    useState<string | null>('file:////data/user/0/com.fugenchat/cache/sound.mp4');
  const [isRecording, setIsRecording] = useState(true);


  const defaultMsg: messageObjType = {
    id: uuid.v4().toString(),
    createdAt: new Date(),
    text: text,
    user: user!,
    type: 'text',
    video: undefined,
    voice: undefined,
    imageList: undefined,
    status: 'sending',
    replyMessage
  }
  return (
    <View style={styles.containerCol}>

      {/* ----------------image footer----------- */}
      {
        imageList && imageList?.length > 0 ?
          <ImageListFooter
            imageList={imageList}
            onClose={() => setImageList([])}
            onImageRemove={image =>
              setImageList(
                imageList?.filter(
                  item => item?.path != image?.path,
                )
              )
            }
          />
          :
          null
      }

      {/* ----------------document footer----------- */}
      {
        document ?
          <DocumentPickerFooter
            document={document?.name!}
            onClose={() => setDocument(undefined)}
          />
          :
          null
      }

      {/* ----------------reply footer----------- */}
      {
        replyMessage ?
          <Animated.View
            style={styles.replyFooter}
            entering={FadeInDown.duration(200)}
          // exiting={FadeInUp}
          >
            <ReplyMessageFooter
              message={replyMessage}
              onClose={() => setReplyMessage &&
                setReplyMessage(undefined)}
            />
          </Animated.View >
          :
          null
      }

      {/* ----------text input and send button----------- */}
      <View
        style={styles.containerRow}
      >

        {/* -----Input------- */}
        <TextInput
          style={styles.txtInput}
          placeholder="Type a message..."
          multiline
          value={text}
          onChangeText={(value) => {
            setText(value);
            onTextChange && onTextChange(value);
          }}
        />
        {/* attachment sheet */}
        <ButtonRipple
          style={styles.btnStyle}
          onPress={() => {
            setIsAttachVisible(true)
          }}
        >
          {
            isAttachVisible ?
              <IconEnt
                name='cross'
                size={20}
                color={"white"}

              />

              :
              <IconEnt
                name='attachment'
                size={20}
                color={"white"}

              />
          }

        </ButtonRipple>
        {/* send button */}
        <ButtonRipple
          style={styles.btnStyle}
          onPress={() => {
            setReplyMessage && setReplyMessage(undefined);
            // if image
            if (imageList.length > 0) {
              onSend && onSend({
                ...defaultMsg,
                type: "image",
                imageList: imageList,
              });
              setText('');
              return;
            }

            // if image
            if (document) {
              onSend && onSend({
                ...defaultMsg,
                type: "document",
                document: document.name!,
              });
              setText('');

              return;
            }

            if (!text)
              return;
            
            //if text
            onSend && onSend(defaultMsg);
            setText('');

          }}
        >
          <IconFe
            name='send'
            size={20}
            color={"white"}
          />
        </ButtonRipple>
      </View>


      {/*------ Attachment sheet ------*/}
      <AttachmentSheet
        imageList={imageList}
        setImageList={setImageList}
        setDocument={setDocument}
        show={isAttachVisible}
        onBtnSound={() => setIsVoiceVisible(true)}
        onClose={() => setIsAttachVisible(false)}
        onBtnCamera={() => {
          openCamera({ mediaType: 'photo' })
            .then(data => {
              onSend && onSend({
                ...defaultMsg,
                type: "image",
                imageList: [{ path: data.path }]
              });
              setText('');
              setReplyMessage && setReplyMessage(undefined);
            })
        }}
        onBtnVideo={() => {
          pickSingleVideo()
            .then(vid => {
              const name = vid.assets[0].fileName;
              const uri = vid.assets[0].uri
              setVideo(uri);
              setShowVideo(true);
            })

        }}
        onBtnLocation={() => {
          setOpenLocation(true);
          setIsAttachVisible(false)
        }}
      />
      {/* ---- Voice Note Sheet ---- */}
      <VoiceNoteSheet
        onPressSend={() => {
          onSend && onSend({
            ...defaultMsg,
            voice: voicePath!,
            type: 'voice'
          });
          setIsVoiceVisible(false);
          setText('');
          setReplyMessage && setReplyMessage(undefined);

        }}
        onPressClose={() => {
          setIsVoiceVisible(false);
        }}
        isOpen={isVoiceVisible}
        setVoicePath={setVoicePath}
        voicePath={voicePath}
        isRecording={isRecording}
        setIsRecording={(isRecording: boolean) =>
          setIsRecording(isRecording)
        }
      />
      {/* ----------Video modal----- */}
      <VideoPlayerModal
        videoList={[video]}
        isOpen={showVideo}
        onClose={() => setShowVideo(false)}
        onSend={(text) => {
          onSend && onSend({
            ...defaultMsg,
            type: "video",
            video: video,
            text
          });
          setText('');
          setShowVideo(false);
          setReplyMessage && setReplyMessage(undefined);
        }}
      />
      {/* -------location selector ---- */}
      <LocationMapSelector
        isOpen={openLocation}
        coord={coord!}
        onClose={() => setOpenLocation(false)}
        setCoord={(coord) => setCoord(coord)}
        onSend={() => {
          onSend && onSend({
            ...defaultMsg,
            type: 'location',
            location: coord,
          })
          setOpenLocation(false);
        }}
      />
    </View>
  );
};
