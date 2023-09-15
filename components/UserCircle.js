import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import ImageToBase64 from './ImageToBase64';

export default function UserCircle({ data, image }) {
  return (
    <View style={styles.main}>
      <View>
        <View style={[styles.circleContainer, {borderColor:data.isFree ? "#24CD35" : "#F24C00"}] }>
          <ImageToBase64 id={data.id}></ImageToBase64>
        </View>
        <View style={styles.circleEmoji}>
          <Text style={styles.circleText}>😎</Text>
        </View>
        <View style={styles.songContainer}>
          <Text style={styles.songEmoji}>🎵 • </Text>
          <View style={styles.songText}>
            <Text numberOfLines={1} style={styles.songTextTitle}>Flame Emoji</Text>
            <Text numberOfLines={1} style={styles.songTextArtiste}>JPEGMAFIA</Text>
          </View>
        </View>
        
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{data.name} {data.surname}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    height: 100,
    width: 100,
  },
  circleContainer: {
    borderRadius: 100,
    height: 100,
    width: 100,
    borderWidth: 2,
    overflow: "hidden",
  },
  userImage: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  circleEmoji: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "#232323",
    borderRadius: 100,
    width: 30,
    height: 30,
    // borderWidth: 4,
  },
  circleText: {
    fontSize: 18,
    color: "white",
    textAlign: 'center',
    // backgroundColor: 'white',
  },
  songContainer: {
    position: "absolute",
    bottom: -10,
    backgroundColor: "#232323",
    width: "100%",
    // maxHeight: 25,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: "center",
    padding : 3
  },
  songText : {
    height: "100%",
    width: '75%',
    alignItems: 'flex-start',
    paddingLeft: 4,
  },
  songEmoji : {
    color: 'white',
    fontSize: 10,
    width: "30%",
    textAlign: 'center',
  },
  songTextArtiste : {
    fontSize: 7,
    fontWeight: "bold",
    fontFamily: "PassionOneBig",
    color: "#979797",
    textAlign: "center",
  },
  songTextTitle: {
    fontSize: 8,
    fontWeight: "bold",
    fontFamily: "PassionOneBig",
    color: "white",
    textAlign: "center",
  },
  nameContainer: {
    maxWidth: "100%",
    maxHeight: 19,
    marginTop: "15%",
  },
  name: {
    fontFamily: "PassionOne",
    fontSize: 15,
    color: "white",
    textAlign: "center"
  }
})
