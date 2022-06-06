import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';
import { Video } from 'expo-av';

const App = () => {
  const [status, setStatus] = useState(false);
  const player = useRef();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={{fontWeight: 'bold'}}>Testing Expo Video Player</Text>
      <Text>Link used:</Text>
      <Text>https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8</Text>
      <Video
        ref={player}
        style={styles.video}
        source={{
          uri: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
        }}
        useNativeControls={true}
        shouldPlay={true}
        onPlaybackStatusUpdate={status => {
          console.warn(status);
          try {
            setStatus(() => status)
          } catch (e) {
            Alert.alert("Error with playback update func", e.message);
          }
        }}
        onError={e => {
          Alert.alert("Error with video component", e);
        }}
      />
      <View>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() => {
            try {
              status.isPlaying ? player.current.pauseAsync() : player.current.playAsync()
            } catch (e) {
              Alert.alert("Error with play btn", e.message)
            }
          
          }}
        />
      </View>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: 300,
    backgroundColor: 'blue',
  }
});
