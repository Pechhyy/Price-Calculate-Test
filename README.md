# Food Store Calculator

A `Calculator` class that prices an order of up to 7 menu items, applying
bundle and member discounts.

## Menu

| Item   | Price (THB) | Bundle-eligible |
| ------ | ----------- | ---------------- |
| Red    | 50          | No               |
| Green  | 40          | Yes              |
| Blue   | 30          | No               |
| Yellow | 50          | No               |
| Pink   | 80          | Yes              |
| Purple | 90          | No               |
| Orange | 120         | Yes              |

## Rules

1. **Bundle discount** — For Orange, Pink, and Green sets, every pair
   (2 units) of the same item gets 5% off that pair. Leftover single units
   are charged at full price. Bundles are calculated per item type
   independently.
2. **Member discount** — If the customer has a member card, an additional
   10% is taken off the order total, applied after bundle discounts.

## Usage

```ts
import { Calculator, MenuItem } from "./calculator";

const calculator = new Calculator();

const total = calculator.calculateTotal(
  {
    [MenuItem.Red]: 1,
    [MenuItem.Orange]: 5,
  },
  true, // has member card
);
```

## Running tests

```bash
npm install
npm test
```

## Design notes

- `MENU_PRICES` and `BUNDLE_ELIGIBLE_ITEMS` are the only places that encode
  business data, so adding/removing menu items or changing which items get
  bundle pricing doesn't touch the calculation logic.
- Discount rates and bundle size are named constants, not magic numbers.
- `calculateItemPrice` isolates the bundle math per item, keeping
  `calculateSubtotal` simple and making it easy to unit test each item type
  independently.
- All money math is rounded once, at the very end, to avoid compounding
  floating-point rounding errors across multiple items.
