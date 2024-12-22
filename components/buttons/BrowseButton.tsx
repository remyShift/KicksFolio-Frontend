import { View, Pressable, Text } from 'react-native';

export default function BrowseButton() {
    return (
        <View className="flex flex-row justify-center">
            <Pressable 
                className="bg-primary p-3 px-6 rounded-md"
                onPress={() => {
                    alert('Search Now');
                }}
            >
                <Text className="font-spacemono-bold text-lg text-center text-white">
                    Search Now
                </Text>
            </Pressable>
        </View>
    );
}
