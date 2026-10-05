import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Product } from "../types";

type ProductCardProps = {
  product: Product;
  added: boolean;
  onToggle: () => void;
};

export default function ProductCard({
  product,
  added,
  onToggle,
}: ProductCardProps) {
  return (
    <View style={[styles.card, added && styles.cardAdded]}>
      <View style={styles.imageBox}>
        {product.chefPick && (
          <View style={styles.chefBadge}>
            <Text style={styles.chefText}>CHEF'S PICK</Text>
          </View>
        )}

        <Text style={styles.emoji}>{product.emoji}</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.name}>{product.name}</Text>

        <Text style={styles.description}>
          {product.description}
        </Text>

        <Text style={[styles.status, added && styles.statusAdded]}>
          {added ? "Added to cart ✓" : "Ready to order"}
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.price}>₹{product.price}</Text>

        <TouchableOpacity
          style={[styles.button, added && styles.buttonAdded]}
          onPress={onToggle}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {added ? "−" : "+"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 132,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    marginBottom: 14,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    elevation: 2,
  },

  cardAdded: {
    borderColor: "#FF6B35",
    borderWidth: 2,
  },

  imageBox: {
    width: 100,
    height: 105,
    borderRadius: 16,
    backgroundColor: "#FFF3EA",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  emoji: {
    fontSize: 48,
  },

  chefBadge: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: "#171717",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },

  chefText: {
    color: "#FFFFFF",
    fontSize: 7,
    fontWeight: "900",
  },

  details: {
    flex: 1,
    marginLeft: 14,
    paddingRight: 10,
  },

  name: {
    color: "#171717",
    fontSize: 17,
    fontWeight: "900",
  },

  description: {
    color: "#888888",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },

  status: {
    color: "#999999",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 12,
  },

  statusAdded: {
    color: "#FF6B35",
  },

  right: {
    height: 105,
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  price: {
    color: "#FF6B35",
    fontSize: 15,
    fontWeight: "900",
  },

  button: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: "#FF6B35",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonAdded: {
    backgroundColor: "#171717",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 28,
    lineHeight: 31,
    fontWeight: "500",
  },
});