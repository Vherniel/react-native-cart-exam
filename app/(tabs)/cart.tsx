import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Product } from '@/data/product-data';
import { type Voucher, useCartStore } from '@/stores/cart-store';
import { clsx } from 'clsx';
import { useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';

export default function CartScreen() {
  const products = useCartStore((state) => state.products);
  const clear = useCartStore((state) => state.clear);

  const items = useCartStore((state) => state.products);
  const voucher = useCartStore((state) => state.voucher);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const total = applyVoucher(subtotal, voucher);
  const saved = subtotal / 100 - total;

  if (products.length === 0) {
    return (
      <ThemedView className="flex-1 items-center justify-center p-4">
        <ThemedText className="text-center text-lg">Your cart is empty.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <>
      <ThemedView className="gap-1 p-4">
        <ThemedText className="text-4xl font-bold">Cart</ThemedText>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CartItemCard item={item} />}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 16, gap: 8 }}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        />
        <Pressable onPress={() => clear()}>
          <Text className="flex-row items-center justify-center gap-2 rounded-sm border border-red-500 px-4 py-2 text-center text-base font-medium text-red-500">
            Remove all items in cart
          </Text>
        </Pressable>
        <View className="flex-row justify-between pt-4">
          <VoucherInput />
          <View>
            {voucher && saved > 0 && (
              <ThemedText className="text-right">Discount: −₱{saved.toFixed(2)}</ThemedText>
            )}
            <ThemedText className="text-right">Subtotal: ₱{(subtotal / 100).toFixed(2)}</ThemedText>
            <ThemedText className="text-right">Grand total: ₱{total.toFixed(2)}</ThemedText>
          </View>
        </View>
      </ThemedView>
    </>
  );
}

function CartItemCard({ item }: { item: Product }) {
  const products = useCartStore((state) => state.products);

  const removeProduct = useCartStore((state) => state.removeProduct);

  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);

  const qty = useCartStore((state) => state.products.find((i) => i.id === item.id)?.qty || 0);

  console.log(products);

  return (
    <ThemedView className="elevation-sm rounded-lg border border-zinc-200 p-4">
      <View className="flex flex-row">
        <View className="flex-1">
          <ThemedText type="defaultSemiBold" className="text-lg">
            {item.productName}
          </ThemedText>
          <ThemedText>
            ₱{(item.price / 100).toFixed(2)} × {qty}
          </ThemedText>
        </View>
        <View>
          <ThemedText className="text-xl font-bold">
            ₱{((item.price * (products.find((i) => i.id === item.id)?.qty ?? 0)) / 100).toFixed(2)}
          </ThemedText>
          <ThemedText className="text-right text-sm">Subtotal</ThemedText>
        </View>
      </View>
      <View className="flex-row items-end justify-between">
        <View style={{ flexDirection: 'row' }}>
          <Pressable onPress={() => decreaseQty(item.id)}>
            <ThemedText className="flex size-9 items-center justify-center border border-zinc-200">
              −
            </ThemedText>
          </Pressable>
          <Pressable onPress={() => increaseQty(item.id)}>
            <ThemedText className="-ml-[1px] flex size-9 items-center justify-center border border-zinc-200">
              +
            </ThemedText>
          </Pressable>
        </View>
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
    </ThemedView>
  );
}

function VoucherInput() {
  const [code, setCode] = useState('');
  const getVoucher = useCartStore((state) => state.voucher);
  const setVoucher = useCartStore((state) => state.setVoucher);
  const clearVoucher = useCartStore((state) => state.clearVoucher);

  const handleApply = () => {
    if (code.toUpperCase() === 'DISCOUNT10') {
      setVoucher({
        code: 'DISCOUNT10',
        type: 'percent',
        value: 10,
        maxDiscount: 50000,
        minSpend: 0,
      });
    } else {
      clearVoucher();
    }
    setCode('');
  };

  if (!getVoucher) {
    return (
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <TextInput
          value={code}
          onChangeText={setCode}
          placeholder="Enter voucher"
          className="flex-1 rounded-sm border border-zinc-200 px-4 py-3"
        />
        <Pressable
          className="rounded-sm border border-zinc-900 bg-zinc-900 px-4 py-2"
          onPress={handleApply}>
          <ThemedText style={{ color: '#fff' }}>Apply</ThemedText>
        </Pressable>
      </View>
    );
  }

  return (
    <ThemedView>
      <ThemedText>Applied code: {getVoucher.code}</ThemedText>
      {getVoucher.type === 'fixed' ? (
        <ThemedText>Discount: ₱{(getVoucher.value / 100).toFixed(2)}</ThemedText>
      ) : (
        <ThemedText>Discount: {getVoucher.value}%</ThemedText>
      )}
      <Pressable onPress={handleApply}>
        <Text className="rounded-sm border border-zinc-900 bg-zinc-900 px-4 py-2 text-white">
          Remove Voucher
        </Text>
      </Pressable>
    </ThemedView>
  );
}

function applyVoucher(subtotal: number, voucher?: Voucher | null) {
  if (!voucher) return subtotal / 100;

  if (voucher.minSpend && subtotal < voucher.minSpend) return subtotal / 100;

  let discount = voucher.type === 'fixed' ? voucher.value : (subtotal * voucher.value) / 100;

  if (voucher.maxDiscount) discount = Math.min(discount, voucher.maxDiscount);

  return Math.max(subtotal - discount, 0) / 100;
}
