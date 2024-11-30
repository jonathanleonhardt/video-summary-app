import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import ButtonComponent from 'components/button-component'
import TextInputComponent from 'components/textinput-component'
import { Paragraph, YStack } from 'tamagui'
import axios from 'axios';
import saveToken from 'service/register-push-notification';

export default function TabOneScreen() {
  const [userId, setUserId] = useState('674b58c3694d0d9164f76a50');
  const [videoUrl, setVideoUrl] = useState('');
  const [hint, setHint] = useState('');
  const router = useRouter();

  useEffect(() => {
    saveToken(userId);
  })

  const handleClick = async () => {
    try {
      const data = {
        videoUrl: videoUrl,
        hint: hint
      };
      const response = await axios.post('http://localhost:3000/api/generate-summary', data);
      const AISummary = response.data;
      console.log('Response:', AISummary);
      router.push({
        pathname: '/ai-summary',
        params: AISummary,
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <YStack f={1} ai="center" gap="$2" px="$4" pt="$12" bg="$background">
      <Paragraph alignSelf="center" mb={30} fontSize={22} fontWeight="800" color="$orange10">video-to-text AI</Paragraph>
      <TextInputComponent
        titleMarginTop="$4"
        textAreaHeight="$8"
        value={videoUrl}
        onChange={(value) => setVideoUrl(value)}
        title="Past the video URL:" />
      <TextInputComponent
        titleMarginTop="$6"
        textAreaHeight="$16"
        value={hint}
        onChange={(value) => setHint(value)}
        title="Give us a hint:" />
      <ButtonComponent title="Convert" btColor="$orange9" func={handleClick} />
    </YStack>
  )
}
