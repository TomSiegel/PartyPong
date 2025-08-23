import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface ActionDisplayProps {
  action: string;
  animation: Animated.Value;
}

const ActionDisplay: React.FC<ActionDisplayProps> = ({ action, animation }) => {
  const spin = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Text style={styles.actionText}>{action}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6347', // Example color, can be changed based on action
  },
});

export default ActionDisplay;