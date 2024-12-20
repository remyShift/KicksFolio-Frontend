import { View, Text } from 'react-native';

export default function SeparatorTitle({ content, textCenter = false }: { content: string, textCenter?: boolean }) {
    const textCenterClass = textCenter ? "text-center" : "";
    return (
        <View className="w-full flex justify-center overflow-hidden px-6">
            <Text className="font-syne-extrabold w-[200%] text-4xl text-primary opacity-10 absolute">
                {content.toUpperCase()}
            </Text>
            <Text className={`font-syne-extrabold text-lg ${textCenterClass}`}>
                {content}
            </Text>
        </View>
    );
}
