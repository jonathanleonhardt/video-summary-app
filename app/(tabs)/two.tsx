import { useEffect, useState } from 'react'
import { ChevronDown } from '@tamagui/lucide-icons'
import { Text, View, Accordion, Paragraph, Square } from 'tamagui'

export default function TabTwoScreen() {
  const [userId, setUserId] = useState('674b58c3694d0d9164f76a50');
  const [history, setHistory] = useState(null);

  useEffect(() => {
     // try {
    //   const data = {
    //     videoUrl: videoUrl,
    //     hint: hint
    //   };
    //   const response = await axios.post('http://localhost:3000/api/generate-summary', data);
    //   const AISummary = response.data;
    //   console.log('Response:', AISummary);
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  }, [userId])

  return (
    <View flex={1} alignItems="center" justifyContent="center" bg="$background">
      <Text fontSize={20} pb="$4">
        History
      </Text>
      <Accordion overflow="hidden" width="$20" type="multiple">
        <Accordion.Item value="a1">
          <Accordion.Trigger flexDirection="row" justifyContent="space-between">
            {({
              open,
            }: {
              open: boolean
            }) => (
              <>
                <Paragraph>1. Take a cold shower</Paragraph>
                <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                  <ChevronDown size="$1" />
                </Square>
              </>
            )}
          </Accordion.Trigger>
          <Accordion.HeightAnimator animation="medium">
            <Accordion.Content animation="medium" exitStyle={{ opacity: 0 }}>
              <Paragraph>
                Cold showers can help reduce inflammation, relieve pain, improve
                circulation, lower stress levels, and reduce muscle soreness and fatigue.
              </Paragraph>
            </Accordion.Content>
          </Accordion.HeightAnimator>
        </Accordion.Item>
      </Accordion>
    </View>
  )
}
