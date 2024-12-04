import { useState, useEffect } from 'react';
import { Stack, SizableText } from 'tamagui';

const DotsLoading = () => {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '.' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Stack pt="$4">
      <SizableText color="$orange10" size="$8" >Loading{dots}</SizableText>
    </Stack>
  );
};

export default DotsLoading;
