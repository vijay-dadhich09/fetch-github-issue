import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BaseInput = ({ children, label }) => (
  <View style={styles.baseInput}>
    <Text style={styles.text}>{label}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  baseInput: {
    width: '80%',
    paddingVertical: 6,
  },
  text: {
		color: '#273746',
		fontSize: 15,
		fontWeight: "600",
	}
});

export default BaseInput;