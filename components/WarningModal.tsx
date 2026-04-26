import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useCopilot } from "react-native-copilot";

type WarningModalProps = {
  showWarning: boolean;
  closeWarning: () => void;
};

export default function WarningModal({
  showWarning,
  closeWarning,
}: WarningModalProps) {
  const { start } = useCopilot();
  return (
    <Modal
      visible={showWarning}
      transparent
      animationType="fade"
      onRequestClose={closeWarning}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>⚠️ Tutorial Notice</Text>

          <Text style={styles.modalText}>
            This guided tutorial may not perfectly align with all elements. Some
            highlights might appear slightly off due to difference in device
            resolution, types, and size.
          </Text>

          <Text style={styles.modalText}>
            Please use it as a general guide rather than an exact walkthrough.
          </Text>

          <View style={styles.modalActions}>
            <Pressable
              style={[styles.modalButton, styles.cancelBtn]}
              onPress={closeWarning}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </Pressable>

            <Pressable
              style={[styles.modalButton, styles.confirmBtn]}
              onPress={() => {
                closeWarning();
                setTimeout(() => start(), 350);
              }}
            >
              <Text style={styles.modalButtonText}>Continue</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 10,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  modalText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 10,
  },

  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },

  cancelBtn: {
    backgroundColor: "#ccc",
  },

  confirmBtn: {
    backgroundColor: "#4A90E2",
  },

  modalButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
