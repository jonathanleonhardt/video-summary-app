import { useEffect, useState } from 'react'
import { ChevronDown } from '@tamagui/lucide-icons'
import { Text, View, Accordion, Paragraph, Square } from 'tamagui'
import axios from 'axios';

interface UserHistory {
  createdAt: string;
  [key: string]: any;
}

export default function TabTwoScreen() {
  const [userId, setUserId] = useState('674b58c3694d0d9164f76a50');
  const [history, setHistory] = useState<UserHistory[]>([]);

  const updateHistory = async (id) => {
    const response: { data: { userHistories: UserHistory[] } } = await axios.get('http://localhost:3000/api/user-history/' + id);
    if (!response.data || response.data.userHistories.length === 0) {
      return
    }
    console.log(response.data.userHistories)
    setHistory(
      response.data.userHistories.sort(
        (a: UserHistory, b: UserHistory) =>
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      )
    );
  }

  useEffect(() => {
    try {
      updateHistory(userId)
    } catch (error) {
      console.error('Error:', error);
    }
  }, [userId])

  return (
    <View flex={1} alignItems="center" justifyContent="center" bg="$background">
      <Text fontSize={20} pb="$4">
        History
      </Text>
      <Accordion overflow="hidden" width="$20" type="multiple">
        {history.map(item => (
          <>
            <Accordion.Item value={item._id}>
              <Accordion.Trigger flexDirection="row" justifyContent="space-between">
                {({ open }: { open: boolean }) => (
                  <>
                    <Paragraph>{item.hint ? item.hint : item.aiSummary?.subString(0, 10)}</Paragraph>
                    <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                      <ChevronDown size="$1" />
                    </Square>
                  </>
                )}
              </Accordion.Trigger>
              <Accordion.HeightAnimator animation="medium">
                <Accordion.Content animation="medium" exitStyle={{ opacity: 0 }}>
                  <Paragraph>Date: {item.createdAt}</Paragraph>
                  <br />
                  <Paragraph>Video URL: {item.videoURL}</Paragraph>
                  <br />
                  <Paragraph>{item.hint ? 'Hint: ' + item.hint : ''}</Paragraph>
                  <br />
                  <Paragraph>{item.aiSummary}</Paragraph>
                  <br />
                  <Paragraph>{item.feedback ? 'GOOD' : 'BAD - ' + item.feedbackDescription}</Paragraph>
                </Accordion.Content>
              </Accordion.HeightAnimator>
            </Accordion.Item>
          </>
        ))}
      </Accordion>
    </View>
  )
}
