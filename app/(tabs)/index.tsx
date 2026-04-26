import WarningModal from "@/components/WarningModal";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const VIDEO_1 = "https://www.w3schools.com/html/mov_bbb.mp4";
const VIDEO_2 = "https://www.w3schools.com/html/movie.mp4";

import { Pressable } from "react-native";
import { CopilotStep, walkthroughable } from "react-native-copilot";

const ControlButton = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

export default function VideoScreen() {
  const [rate, setRate] = useState(1.0);
  const [volume, setVolume] = useState(1.0);
  const [showWarning, setShowWarning] = useState(false);

  const WalkthroughableView = walkthroughable(View);

  const player = useVideoPlayer(VIDEO_1, (player) => {
    player.currentTime = 0;
    player.loop = true;
    player.playbackRate = 1.0;
    player.volume = 1.0;
    player.staysActiveInBackground = false;
  });

  useFocusEffect(
    useCallback(() => {
      player.play();

      return () => {
        try {
          if (player?.playing !== undefined) {
            player.pause();
          }
        } catch (e) {
          console.log(e);
        }
      };
    }, [player]),
  );

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <View style={styles.container}>
      <VideoView
        style={styles.video}
        player={player}
        nativeControls
        fullscreenOptions={{ enable: true }}
        allowsPictureInPicture
      />

      <CopilotStep name="video" order={1} text="This is the video player">
        <WalkthroughableView
          collapsable={false}
          pointerEvents="none"
          style={styles.videoHighlight}
        />
      </CopilotStep>

      <View style={styles.properties}>
        <Text style={styles.label}>Playing: {isPlaying ? "Yes" : "No"}</Text>
        <Text style={styles.label}>Speed: {rate.toFixed(2)}x</Text>
        <Text style={styles.label}>Volume: {volume.toFixed(2)}</Text>
        <Text style={styles.label}>Loop: {player.loop.toString()}</Text>
        <Text style={styles.label}>
          Active in Background: {player.staysActiveInBackground.toString()}
        </Text>
      </View>

      <Pressable onPress={() => setShowWarning(true)} style={styles.helpBtn}>
        <Ionicons name="help" size={24} color="white" />
      </Pressable>

      <WarningModal
        showWarning={showWarning}
        closeWarning={() => setShowWarning(false)}
      />

      <ScrollView
        style={styles.controls}
        contentContainerStyle={styles.controlsContent}
        showsVerticalScrollIndicator={true}
      >
        <ControlButton
          title={isPlaying ? "Pause" : "Play"}
          onPress={() => (isPlaying ? player.pause() : player.play())}
        />

        <ControlButton
          title="Jump to 5s"
          onPress={() => (player.currentTime = 5)}
        />

        <ControlButton
          title="0.5x Speed"
          onPress={() => {
            player.playbackRate = 0.5;
            setRate(0.5);
          }}
        />

        <ControlButton
          title="2.0x Speed"
          onPress={() => {
            player.playbackRate = 2.0;
            setRate(2.0);
          }}
        />

        <ControlButton
          title="Volume 50%"
          onPress={() => {
            player.volume = 0.5;
            setVolume(0.5);
          }}
        />

        <ControlButton
          title="Mute"
          onPress={() => {
            player.volume = 0;
            setVolume(0);
          }}
        />

        <ControlButton
          title="Toggle Loop"
          onPress={() => {
            player.loop = !player.loop;
          }}
        />

        <ControlButton
          title="Enable Background Play"
          onPress={() => (player.staysActiveInBackground = true)}
        />

        <ControlButton
          title="Disable Background Play"
          onPress={() => (player.staysActiveInBackground = false)}
        />

        <ControlButton
          title="Switch to Video 2"
          onPress={() => {
            player.replaceAsync(VIDEO_2);
            player.play();
          }}
        />

        <ControlButton
          title="Switch to Video 1"
          onPress={async () => {
            await player.replaceAsync(VIDEO_1);
            player.play();
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  helpBtn: {
    position: "absolute",
    top: -40,
    right: 10,
    backgroundColor: "#000ac9",
    borderRadius: 20,
    padding: 10,
    zIndex: 999,
  },
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    paddingHorizontal: 50,
    marginTop: 80,
  },
  video: {
    width: "100%",
    height: 220,
    backgroundColor: "#000",
  },
  videoHighlight: {
    position: "absolute",
    top: 0,
    left: 30,
    right: 50,
    height: 260,
    width: 330,
  },
  properties: {
    marginBottom: 20,
    marginTop: 20,
  },
  controls: {
    maxHeight: 200,
    maxWidth: 600,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    backgroundColor: "#fafafa",
  },

  controlsContent: {
    padding: 20,
  },

  label: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333",
  },

  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },

  buttonPressed: {
    opacity: 0.7,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
