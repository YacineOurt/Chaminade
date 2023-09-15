import { View, Text, StyleSheet} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BasicLayout({ children }) {

  return (
      <SafeAreaView style={styles.container}>
        <LinearGradient colors={['#12460C', '#12460C', '#F9FFF8', '#F9FFF8']}
            locations={[0, 0.3, 0.3, 1]} style={styles.backgroundGradient}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
            KACTY
            </Text>
          </View>
          <View style={styles.body}>
            {children}
          </View>
        </LinearGradient>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    height: "95%",
    width: "100%",
    marginTop: 12
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: "column",
    height: '100%',
    width: "100%",
    backgroundGradient: 'linear-gradient(110deg, #fdcd3b 60%, #ffed4b 60%)',
  },
  backgroundGradient: {
    display: 'flex',
    flexDirection: "column",
    flex: 1
  },
  title: {
    fontFamily: 'PassionOne',
    fontSize: 35,
    color: "#FFB92F",
    textShadowColor: "rgba(0, 0, 0, 0.40)",
    textShadowOffset: { width: 0, height: 3 },
  },
  titleContainer: {
    height: "5%",
    marginTop: "3%",
    paddingLeft: "5%",
    letterSpacing: 1.9,
  }
});
