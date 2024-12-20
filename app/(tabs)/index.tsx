import { View, StyleSheet } from 'react-native';
import MainTitle from '@/components/text/MainTitle';

export default function Tab() {
  return (
    <View className="flex-1 items-center p-4 pt-20">
      <MainTitle content="KicksFolio" />
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
