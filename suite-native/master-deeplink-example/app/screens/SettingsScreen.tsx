import { Text, View, StyleSheet } from 'react-native';

export const SettingsScreen = ({ data }: any) => {
    return (
        <View style={styles.container}>
            <Text>Settings Screen</Text>
            {data && <Text>Received Data: {JSON.stringify(data)}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
});
