import { Text } from 'react-native';

export default function MainTitle({ children }: { children: React.ReactNode }) {
  return <Text className="font-actonia text-4xl text-primary">{children}</Text>;
}
