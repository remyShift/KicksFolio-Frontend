import { View, Text } from 'react-native';

export default function SeparatorTitle({ content }: { content: string }) {
    return (
        <View className="w-full flex justify-center overflow-hidden p-4">
            <Text className="font-syne-extrabold w-[200%] text-4xl text-primary opacity-10 absolute">
                {content.toUpperCase()}
            </Text>
            <Text className="font-syne-extrabold text-lg">
                {content}
            </Text>
        </View>
    );
}
