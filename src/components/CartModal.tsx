
import {
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Product } from "../types";

type CartModalProps = {
  visible: boolean;
  items: Product[];
  total: number;
  onClose: () => void;
  onRemove: (product: Product) => void;
  onCheckout: () => void;
};

export default function CartModal({
  visible,
  items,
  total,
  onClose,
  onRemove,
  onCheckout,
}: CartModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Your Cart</Text>
              <Text style={styles.subtitle}>
                {items.length} {items.length === 1 ? "item" : "items"} selected
              </Text>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
          </View>

          {/* Cart Items */}
          {items.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyEmoji}>🛒</Text>

              <Text style={styles.emptyTitle}>
                Your cart is empty
              </Text>

              <Text style={styles.emptyText}>
                Add some delicious food to continue.
              </Text>

              <TouchableOpacity
                style={styles.continueButton}
                onPress={onClose}
                activeOpacity={0.8}
              >
                <Text style={styles.continueText}>
                  Browse Menu
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <ScrollView
                style={styles.itemsList}
                contentContainerStyle={styles.itemsContent}
                showsVerticalScrollIndicator={false}
              >
                {items.map((item) => (
                  <View
                    key={item.id}
                    style={styles.cartItem}
                  >
                    <View style={styles.emojiBox}>
                      <Text style={styles.emoji}>
                        {item.emoji}
                      </Text>
                    </View>

                    <View style={styles.itemInfo}>
                      <Text style={styles.itemName}>
                        {item.name}
                      </Text>

                      <Text style={styles.itemPrice}>
                        ₹{item.price}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => onRemove(item)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.removeText}>
                        Remove
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>

              {/* Bottom Section */}
              <View style={styles.bottom}>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>
                    Total
                  </Text>

                  <Text style={styles.total}>
                    ₹{total}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.checkoutButton}
                  onPress={onCheckout}
                  activeOpacity={0.8}
                >
                  <Text style={styles.checkoutText}>
                    Checkout
                  </Text>

                  <Text style={styles.arrow}>
                    →
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={onClose}
                  activeOpacity={0.7}
                >
                  <Text style={styles.cancelText}>
                    Continue Shopping
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  modal: {
    width: "100%",
    maxHeight: "85%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 22,
    paddingHorizontal: 22,
    paddingBottom: Platform.OS === "web" ? 22 : 30,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  title: {
    color: "#171717",
    fontSize: 24,
    fontWeight: "900",
  },

  subtitle: {
    color: "#999999",
    fontSize: 12,
    marginTop: 3,
  },

  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F4F4F4",
    alignItems: "center",
    justifyContent: "center",
  },

  closeText: {
    color: "#555555",
    fontSize: 28,
    lineHeight: 30,
  },

  itemsList: {
    maxHeight: 330,
  },

  itemsContent: {
    paddingTop: 15,
    paddingBottom: 10,
  },

  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  emojiBox: {
    width: 54,
    height: 54,
    borderRadius: 15,
    backgroundColor: "#FFF3EA",
    alignItems: "center",
    justifyContent: "center",
  },

  emoji: {
    fontSize: 27,
  },

  itemInfo: {
    flex: 1,
    marginLeft: 13,
  },

  itemName: {
    color: "#171717",
    fontSize: 14,
    fontWeight: "800",
  },

  itemPrice: {
    color: "#FF6B35",
    fontSize: 13,
    fontWeight: "800",
    marginTop: 5,
  },

  removeButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 9,
    backgroundColor: "#FFF0ED",
  },

  removeText: {
    color: "#E74C3C",
    fontSize: 11,
    fontWeight: "800",
  },

  bottom: {
    paddingTop: 15,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 13,
  },

  totalLabel: {
    color: "#555555",
    fontSize: 15,
    fontWeight: "700",
  },

  total: {
    color: "#171717",
    fontSize: 23,
    fontWeight: "900",
  },

  checkoutButton: {
    height: 52,
    borderRadius: 15,
    backgroundColor: "#FF6B35",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  checkoutText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },

  arrow: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    marginLeft: 10,
  },

  cancelButton: {
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },

  cancelText: {
    color: "#888888",
    fontSize: 12,
    fontWeight: "700",
  },

  empty: {
    alignItems: "center",
    paddingVertical: 50,
  },

  emptyEmoji: {
    fontSize: 50,
  },

  emptyTitle: {
    color: "#171717",
    fontSize: 19,
    fontWeight: "900",
    marginTop: 12,
  },

  emptyText: {
    color: "#999999",
    fontSize: 13,
    marginTop: 5,
    textAlign: "center",
  },

  continueButton: {
    marginTop: 20,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#FFF0E7",
  },

  continueText: {
    color: "#FF6B35",
    fontSize: 13,
    fontWeight: "900",
  },
});