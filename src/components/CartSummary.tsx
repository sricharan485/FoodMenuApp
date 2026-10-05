import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type CartSummaryProps = {
  count: number;
  total: number;
  onPress: () => void;
};

export default function CartSummary({
  count,
  total,
  onPress,
}: CartSummaryProps) {
  if (count === 0) return null;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.iconBox}>
        <Text style={styles.icon}>🛒</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>Your Cart</Text>
        <Text style={styles.subtitle}>
          {count} {count === 1 ? "item" : "items"} selected
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.total}>₹{total}</Text>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 18,
    height: 72,
    borderRadius: 20,
    backgroundColor: "#171717",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    zIndex: 100,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },

  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#2B2B2B",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  icon: {
    fontSize: 25,
  },

  badge: {
    position: "absolute",
    top: -7,
    right: -7,
    minWidth: 23,
    height: 23,
    paddingHorizontal: 5,
    borderRadius: 12,
    backgroundColor: "#FF6B35",
    borderWidth: 2,
    borderColor: "#171717",
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "900",
  },

  info: {
    flex: 1,
    marginLeft: 13,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },

  subtitle: {
    color: "#AAAAAA",
    fontSize: 11,
    marginTop: 3,
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
  },

  total: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
  },

  arrow: {
    color: "#FFFFFF",
    fontSize: 28,
    marginLeft: 8,
  },
});