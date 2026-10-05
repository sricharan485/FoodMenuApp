
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type CategoryBarProps = {
  categories: string[];
  activeCategory: string;
  horizontal: boolean;
  onCategoryPress: (category: string) => void;
};

export default function CategoryBar({
  categories,
  activeCategory,
  horizontal,
  onCategoryPress,
}: CategoryBarProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Categories
      </Text>

      <ScrollView
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          horizontal
            ? styles.horizontalList
            : styles.verticalList
        }
      >
        {categories.map((category: string) => {
          const active =
            category === activeCategory;

          return (
            <TouchableOpacity
              key={category}
              onPress={() =>
                onCategoryPress(category)
              }
              activeOpacity={0.8}
              style={[
                styles.category,
                active &&
                  styles.activeCategory,
              ]}
            >
              <Text
                style={[
                  styles.text,
                  active &&
                    styles.activeText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    paddingBottom: 12,
  },

  title: {
    fontSize: 15,
    fontWeight: "800",
    color: "#171717",
    marginBottom: 12,
  },

  horizontalList: {
    gap: 8,
  },

  verticalList: {
    gap: 8,
  },

  category: {
    paddingHorizontal: 15,
    paddingVertical: 11,
    borderRadius: 12,
  },

  activeCategory: {
    backgroundColor: "#FF6B35",
  },

  text: {
    color: "#777777",
    fontSize: 14,
    fontWeight: "600",
  },

  activeText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
});