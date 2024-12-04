import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import ButtonComponent from 'components/button-component'
import TextInputComponent from 'components/textinput-component'
import { Paragraph, YStack } from 'tamagui'
import axios from 'axios';
import saveToken from 'service/register-push-notification';
import { useLocalSearchParams } from 'expo-router';
import DotsLoading from 'components/loading-component';
import { BotMessageSquare } from '@tamagui/lucide-icons'

export default function TabOneScreen() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    videoUrl: '',
    userHint: '',
  });

  const router = useRouter();
  const { userId } = useLocalSearchParams();

  useEffect(() => {
    saveToken(userId.toString());
  }, [])

  const handleInputChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await axios.post('https://2a3c-201-76-113-98.ngrok-free.app/api/generate-summary', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const AISummary = response.data;
      AISummary.userId = userId;
      AISummary.videoURL = formData.videoUrl
      AISummary.userHint = formData.userHint
      console.log('Response:', AISummary);
      router.push({
        pathname: '/ai-summary',
        params: AISummary,
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <YStack f={1} ai="center" gap="$2" px="$4" pt="$12" bg="$background">
      <Paragraph alignSelf="center" mb={30} fontSize={22} fontWeight="800" color="$orange10">video-to-text AI</Paragraph>
      {loading ?
        <DotsLoading/>
        :
        <ButtonComponent title="Convert" btColor="$orange9" func={handleClick} />}


      <TextInputComponent
        titleMarginTop="$4"
        textAreaHeight="$8"
        value={formData.videoUrl}
        // onChange={(value) => setVideoUrl(value)}
        onChange={(text) => handleInputChange('videoUrl', text)}
        title="Past the video URL:" />
      <TextInputComponent
        titleMarginTop="$6"
        textAreaHeight="$16"
        value={formData.userHint}
        // onChange={(value) => setHint(value)}
        onChange={(text) => handleInputChange('userHint', text)}
        title="Give us a hint:" />
          </YStack>
  )
}
