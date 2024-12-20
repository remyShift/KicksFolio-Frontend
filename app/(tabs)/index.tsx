import { View, StyleSheet } from 'react-native';
import MainTitle from '@/components/text/MainTitle';
import SeparatorTitle from '@/components/text/SeparatorTitle';
import BrandTitle from '@/components/text/BrandTitle';

export default function Tab() {
  return (
    <View className="flex-1 items-center pt-16 gap-10">
      <MainTitle content="KicksFolio" />
      <SeparatorTitle content="MY COLLECTION" />
      <SeparatorTitle content="Add some friends" textCenter={true} />
      <BrandTitle content="New Balance" />
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
