import ProtectedRoute from '@/components/ProctectedRoute';
import { StyleSheet, Text, View } from 'react-native';

export default function Tab() {
  return (
    <ProtectedRoute>
        <View style={styles.container}>
            <Text>Tab [Friends]</Text>
        </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
