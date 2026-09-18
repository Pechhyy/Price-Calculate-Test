import { MenuItem, Order } from "./items";

const MENU_PRICES: Record<MenuItem, number> = {
  [MenuItem.Red]: 50,
  [MenuItem.Green]: 40,
  [MenuItem.Blue]: 30,
  [MenuItem.Yellow]: 50,
  [MenuItem.Pink]: 80,
  [MenuItem.Purple]: 90,
  [MenuItem.Orange]: 120,
};

const BUNDLE_ELIGIBLE_ITEMS = new Set<MenuItem>([
  MenuItem.Orange,
  MenuItem.Pink,
  MenuItem.Green,
]);

const ALL_MENU_ITEMS = Object.values(MenuItem);
const MEMBER_DISCOUNT_RATE = 0.1;
const BUNDLE_DISCOUNT_RATE = 0.05;
const BUNDLE_SIZE = 2;

export class PriceCalculator {
  priceCalculateTotal(order: Order, isMember = false) {
    const subtotal = this.calculateSubtotal(order);
    const total = isMember ? subtotal * (1 - MEMBER_DISCOUNT_RATE) : subtotal;

    return Math.round(total * 100) / 100;
  }

  private calculateSubtotal(order: Order) {
    let subtotal = 0;

    for (const item of ALL_MENU_ITEMS) {
      const quantity = order[item] ?? 0;
      if (quantity <= 0) continue;
      subtotal += this.calculateItemPrice(item, quantity);
    }

    return subtotal;
  }

  private calculateItemPrice(item: MenuItem, quantity: number) {
    const unitPrice = MENU_PRICES[item];

    if (!BUNDLE_ELIGIBLE_ITEMS.has(item)) {
      return unitPrice * quantity;
    }

    const bundles = Math.floor(quantity / BUNDLE_SIZE);
    const remainder = quantity % BUNDLE_SIZE;

    const bundlePrice =
      unitPrice * BUNDLE_SIZE * (1 - BUNDLE_DISCOUNT_RATE) * bundles;
    const remainderPrice = unitPrice * remainder;

    return bundlePrice + remainderPrice;
  }
}
