import {
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Alert,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import CartModal from "../components/CartModal";
import CartSummary from "../components/CartSummary";
import CategoryBar from "../components/CategoryBar";
import ProductCard from "../components/ProductCard";

import {
  categories,
  products,
} from "../data/product";

import {
  clearCart,
  toggleCart,
} from "../store/cartSlice";

import { RootState } from "../store/store";
import { Product } from "../types";

const WEB_WIDTH = 800;

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const isWeb =
    Platform.OS === "web" && width >= WEB_WIDTH;

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const [activeCategory, setActiveCategory] =
    useState<string>(categories[0]);

  const [search, setSearch] = useState<string>("");

  const [cartVisible, setCartVisible] =
    useState<boolean>(false);

  const scrollRef = useRef<ScrollView>(null);

  const categoryPositions =
    useRef<Record<string, number>>({});

  const filteredProducts = useMemo(() => {
    const text = search.trim().toLowerCase();

    if (!text) return products;

    return products.filter(
      (product: Product) =>
        product.name.toLowerCase().includes(text) ||
        product.description.toLowerCase().includes(text) ||
        product.category.toLowerCase().includes(text)
    );
  }, [search]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const isAdded = (id: string) =>
    cartItems.some((item) => item.id === id);

  const selectCategory = (category: string) => {
    setActiveCategory(category);

    const position =
      categoryPositions.current[category];

    if (position === undefined) return;

    scrollRef.current?.scrollTo({
      y: Math.max(0, position - 10),
      animated: true,
    });
  };

  const handleScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const scrollY =
      event.nativeEvent.contentOffset.y;

    let currentCategory = categories[0];

    categories.forEach((category: string) => {
      const position =
        categoryPositions.current[category];

      if (
        position !== undefined &&
        scrollY >= position - 100
      ) {
        currentCategory = category;
      }
    });

    if (currentCategory !== activeCategory) {
      setActiveCategory(currentCategory);
    }
  };

  const handleCartToggle = (product: Product) => {
    dispatch(toggleCart(product));
  };

  const checkout = () => {
    if (cartItems.length === 0) return;

    const orderTotal = total;

    setCartVisible(false);

    if (Platform.OS === "web") {
      globalThis.alert(
        `Order Confirmed 🎉\n\nYour order of ₹${orderTotal} has been placed successfully!`
      );

      dispatch(clearCart());
      return;
    }

    Alert.alert(
      "Order Confirmed 🎉",
      `Your order of ₹${orderTotal} has been placed successfully!`,
      [
        {
          text: "Done",
          onPress: () => dispatch(clearCart()),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.page}>
        {isWeb && (
          <View style={styles.sidebar}>
            <View style={styles.logoRow}>
              <View style={styles.logoIcon}>
                <Text style={styles.logoIconText}>✦</Text>
              </View>

              <View>
                <Text style={styles.logo}>DINE</Text>
                <Text style={styles.logoSub}>
                  fresh & tasty
                </Text>
              </View>
            </View>

            <Text style={styles.categoryHeading}>
              Categories
            </Text>

            <CategoryBar
              categories={categories}
              activeCategory={activeCategory}
              horizontal={false}
              onCategoryPress={selectCategory}
            />

            <View style={styles.chefBox}>
              <Text style={styles.chefEmoji}>👨‍🍳</Text>
              <Text style={styles.chefTitle}>
                Chef's Picks
              </Text>
              <Text style={styles.chefText}>
                Hand-picked dishes made especially for you.
              </Text>
            </View>
          </View>
        )}

        <View style={styles.main}>
          {!isWeb && (
            <View style={styles.mobileHeader}>
              <View style={styles.mobileTop}>
                <View>
                  <Text style={styles.mobileLogo}>
                    DINE
                  </Text>

                  <Text style={styles.mobileLogoSub}>
                    fresh & tasty
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.mobileCart}
                  onPress={() => setCartVisible(true)}
                >
                  <Text style={styles.mobileCartIcon}>
                    🛒
                  </Text>

                  {cartItems.length > 0 && (
                    <View style={styles.mobileBadge}>
                      <Text style={styles.mobileBadgeText}>
                        {cartItems.length}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>

              <CategoryBar
                categories={categories}
                activeCategory={activeCategory}
                horizontal={true}
                onCategoryPress={selectCategory}
              />
            </View>
          )}

          <View style={styles.header}>
            <Text style={styles.welcome}>
              Good food, good mood ✨
            </Text>

            <Text style={styles.title}>
              Delicious Choices
            </Text>

            <Text style={styles.subtitle}>
              Pick your favorites and build your perfect meal.
            </Text>

            <View style={styles.searchBox}>
              <Text style={styles.searchIcon}>🔎</Text>

              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search your favorite food..."
                placeholderTextColor="#999999"
                style={styles.searchInput}
              />

              {search.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearch("")}
                >
                  <Text style={styles.clear}>×</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <ScrollView
            ref={scrollRef}
            style={styles.scroll}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {categories.map((category: string) => {
              const categoryProducts =
                filteredProducts.filter(
                  (product: Product) =>
                    product.category === category
                );

              if (categoryProducts.length === 0) {
                return null;
              }

              return (
                <View
                  key={category}
                  style={styles.section}
                  onLayout={(event) => {
                    categoryPositions.current[category] =
                      event.nativeEvent.layout.y;
                  }}
                >
                  <View style={styles.sectionHeader}>
                    <View>
                      <Text style={styles.sectionTitle}>
                        {category}
                      </Text>

                      <Text style={styles.sectionSub}>
                        {categoryProducts.length} delicious options
                      </Text>
                    </View>

                    <View style={styles.numberBox}>
                      <Text style={styles.numberText}>
                        {categoryProducts.length}
                      </Text>
                    </View>
                  </View>

                  {categoryProducts.map(
                    (product: Product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        added={isAdded(product.id)}
                        onToggle={() =>
                          handleCartToggle(product)
                        }
                      />
                    )
                  )}
                </View>
              );
            })}

            {filteredProducts.length === 0 && (
              <View style={styles.noResults}>
                <Text style={styles.noResultsEmoji}>
                  🔎
                </Text>

                <Text style={styles.noResultsTitle}>
                  Nothing found
                </Text>

                <Text style={styles.noResultsText}>
                  Try searching for another dish.
                </Text>
              </View>
            )}
          </ScrollView>

          <CartSummary
            count={cartItems.length}
            total={total}
            onPress={() => setCartVisible(true)}
          />

          <CartModal
            visible={cartVisible}
            items={cartItems}
            total={total}
            onClose={() => setCartVisible(false)}
            onRemove={handleCartToggle}
            onCheckout={checkout}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },

  page: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FAFAFA",
  },

  sidebar: {
    width: 235,
    backgroundColor: "#FFFFFF",
    borderRightWidth: 1,
    borderRightColor: "#EEEEEE",
    paddingHorizontal: 18,
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 28,
    paddingBottom: 20,
  },

  logoIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: "#FF6B35",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  logoIconText: {
    color: "#FFFFFF",
    fontSize: 25,
  },

  logo: {
    color: "#171717",
    fontSize: 21,
    fontWeight: "900",
  },

  logoSub: {
    color: "#999999",
    fontSize: 9,
  },

  categoryHeading: {
    color: "#171717",
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 8,
  },

  chefBox: {
    marginTop: "auto",
    marginBottom: 25,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#FFF3EA",
  },

  chefEmoji: {
    fontSize: 25,
  },

  chefTitle: {
    color: "#171717",
    fontSize: 14,
    fontWeight: "900",
    marginTop: 6,
  },

  chefText: {
    color: "#888888",
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },

  main: {
    flex: 1,
  },

  mobileHeader: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingHorizontal: 18,
  },

  mobileTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 15,
  },

  mobileLogo: {
    color: "#171717",
    fontSize: 20,
    fontWeight: "900",
  },

  mobileLogoSub: {
    color: "#999999",
    fontSize: 9,
  },

  mobileCart: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: "#F4F4F4",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  mobileCartIcon: {
    fontSize: 22,
  },

  mobileBadge: {
    position: "absolute",
    right: -5,
    top: -5,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FF6B35",
    alignItems: "center",
    justifyContent: "center",
  },

  mobileBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "900",
  },

  header: {
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 10,
  },

  welcome: {
    color: "#FF6B35",
    fontSize: 12,
    fontWeight: "800",
  },

  title: {
    color: "#171717",
    fontSize: 30,
    fontWeight: "900",
    marginTop: 4,
  },

  subtitle: {
    color: "#888888",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },

  searchBox: {
    height: 48,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    marginTop: 18,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  searchIcon: {
    fontSize: 17,
  },

  searchInput: {
    flex: 1,
    height: 48,
    marginLeft: 8,
    color: "#171717",
    fontSize: 13,
  },

  clear: {
    color: "#999999",
    fontSize: 23,
    paddingHorizontal: 5,
  },

  scroll: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 24,
    paddingBottom: 180,
  },

  section: {
    paddingTop: 20,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 13,
  },

  sectionTitle: {
    color: "#171717",
    fontSize: 21,
    fontWeight: "900",
  },

  sectionSub: {
    color: "#999999",
    fontSize: 11,
    marginTop: 2,
  },

  numberBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#FFF0E7",
    alignItems: "center",
    justifyContent: "center",
  },

  numberText: {
    color: "#FF6B35",
    fontSize: 12,
    fontWeight: "900",
  },

  noResults: {
    alignItems: "center",
    paddingTop: 80,
  },

  noResultsEmoji: {
    fontSize: 45,
  },

  noResultsTitle: {
    color: "#171717",
    fontSize: 19,
    fontWeight: "900",
    marginTop: 12,
  },

  noResultsText: {
    color: "#888888",
    fontSize: 13,
    marginTop: 4,
  },
});