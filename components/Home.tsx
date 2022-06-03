import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import { useState } from "react";
import { ImagePickerResult } from "expo-image-picker";

export default function Home() {
  const [pickedImage, setPickedImage] = useState<ImagePickerResult | null>(
    null
  );
  const handlePickimage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission) return alert("동의는 필수 입니다");

    const pickedImage = await ImagePicker.launchImageLibraryAsync();
    setPickedImage(pickedImage);
  };

  const handleShare = async () => {
    await Sharing.shareAsync(pickedImage.uri);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: pickedImage?.uri || "",
        }}
        style={styles.image}
      />
      <Text style={styles.text}>Instagram</Text>
      {pickedImage ? (
        <>
          <TouchableOpacity onPress={handleShare} style={styles.button}>
            <Text style={{ color: "#222", fontWeight: "bold", fontSize: 25 }}>
              공유하기
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPickedImage(null)}
            style={styles.button}
          >
            <Text style={{ color: "#222", fontWeight: "bold", fontSize: 25 }}>
              선택취소
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity onPress={handlePickimage} style={styles.button}>
          <Text style={{ color: "#222", fontWeight: "bold", fontSize: 25 }}>
            선택하기
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 50,
    fontWeight: "bold",
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: "cover",
  },
  button: {
    backgroundColor: "#FFE6E6",
    width: "60%",
    paddingVertical: 20,
    alignItems: "center",
  },
});
