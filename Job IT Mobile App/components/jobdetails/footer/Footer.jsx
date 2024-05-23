import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { icons } from "../../../constants";

import styles from "./footer.style";

const Footer = ({ url }) => {
  const [fillHeart, setFillHeart] = useState(true);
  const heartPress = () => {
    setFillHeart((prev) => !prev);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.likeBtn} onPress={heartPress}>
        <Image
          source={fillHeart ? icons.heartOutline : icons.heart}
          resizeMode="contain"
          style={styles.likeBtnImage}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => Linking.openURL(url)}
      >
        <Text style={styles.applyBtnText}>Apply For Job</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
