import { View, StyleSheet } from 'react-native';
import MainTitle from '@/components/text/MainTitle';
import SeparatorTitle from '@/components/text/SeparatorTitle';

export default function Tab() {
  return (
    <View className="flex-1 items-center pt-16">
      <MainTitle content="KicksFolio" />
      <SeparatorTitle content="MY COLLECTION" />
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
