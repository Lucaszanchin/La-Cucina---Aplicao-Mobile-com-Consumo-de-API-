import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

export default function EmptyState() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nenhuma receita encontrada.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 32,
    padding: 16,
  },
  text: {
    color: theme.colors.textSecondary,
    fontSize: 15,
    fontWeight: '500',
  },
});
