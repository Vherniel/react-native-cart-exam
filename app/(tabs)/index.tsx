import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FlatList, Pressable, View, Text } from 'react-native';
import { type Product, products } from '@/data/product-data';
import { useCartStore } from '@/stores/cart-store';
import { clsx } from 'clsx';

export default function ProductsScreen() {
  return (
    <>
      <ThemedView className="p-4">
        <ThemedText className="text-4xl font-bold">React Native Add to Cart Exam</ThemedText>
      </ThemedView>
      <ThemedView className="gap-4 p-4">
        <ThemedText className="text-2xl font-bold">Filipino Breakfast Menu</ThemedText>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ItemCard item={item} />}
          contentContainerStyle={{}}
          ItemSeparatorComponent={() => <ThemedView className="h-4" />}
        />
      </ThemedView>
    </>
  );
}

function ItemCard({ item }: { item: Product }) {
  const products = useCartStore((state) => state.products);
  const addProduct = useCartStore((state) => state.addProduct);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const isInCart = products.find((i) => i.id === item.id) !== undefined;

  return (
    <ThemedView className="elevation-sm rounded-lg border border-zinc-200 p-4">
      <View className="flex flex-row">
        <View className="flex-1">
          <ThemedText type="defaultSemiBold" className="text-lg">
            {item.productName}
          </ThemedText>
          <ThemedText>{item.description}</ThemedText>
        </View>
        <View>
          <ThemedText className="text-2xl font-bold">₱{(item.price / 100).toFixed(2)}</ThemedText>
        </View>
      </View>
      {!isInCart ? (
        <View className="flex flex-row">
          <Pressable
            className={
              'mt-4 flex-row items-center justify-center gap-2 rounded-sm border border-zinc-900 bg-zinc-900 px-4 py-2'
            }
            onPress={() => addProduct(item)}>
            <Text className="text-base font-medium text-white">Add to cart</Text>
          </Pressable>
        </View>
      ) : (
        <View className="flex flex-row items-center">
          <Text
            className={clsx(
              `mr-auto`,
              `mt-4 flex-row items-center justify-center gap-2 rounded-sm border border-zinc-200 bg-zinc-100 px-4 py-2 text-base font-medium text-zinc-800`
            )}>
            Already in cart
          </Text>
          <Pressable onPress={() => removeProduct(item.id)}>
            <Text
              className={clsx(
                `mr-auto`,
                `mt-4 flex-row items-center justify-center gap-2 rounded-sm border border-red-500 bg-red-500 px-4 py-2 text-base font-medium text-white`
              )}>
              Remove
            </Text>
          </Pressable>
        </View>
      )}
    </ThemedView>
  );
}
