import { View, Text, StyleSheet } from 'react-native';
import MainTitle from '@/components/text/MainTitle';
import SeparatorTitle from '@/components/text/SeparatorTitle';

export default function Tab() {
  return (
    <View className="flex-1 items-center pt-20">
      <MainTitle>KicksFolio</MainTitle>
      <SeparatorTitle content="My collection" />
      <SeparatorTitle content="Add some friends" isTextCenter={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});