import React from 'react';
import { SafeAreaView, Text } from 'react-native';

const Conversion = ({ route }) => {
  const { conversationId } = route.params;

  return (
    <SafeAreaView>
      <Text>Conversion {conversationId}</Text>
    </SafeAreaView>
  );
};

export default Conversion;
