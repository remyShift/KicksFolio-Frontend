import { Text } from 'react-native';

export default function MainTitle({ content }: { content: string }) {
    return (
        <Text className="font-actonia text-4xl text-primary">{content}</Text>
    );
}

