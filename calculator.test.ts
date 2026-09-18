import { PriceCalculator } from "./calculator";
import { MenuItem } from "./items";

//* Red 50 | Green 40 | Blue 30 | Yellow 50 | Pink 80 | Purple 90 | Orange 120

describe("PriceCalculator", () => {
  let calculator: PriceCalculator;

  beforeEach(() => {
    calculator = new PriceCalculator();
  });

  it("Desk#1: Red + Green = 90", () => {
    const total = calculator.priceCalculateTotal({
      [MenuItem.Red]: 1,
      [MenuItem.Green]: 1,
    });

    expect(total).toBe(90);
  });

  it("Desk#1 + member card: 90 * 0.9 = 81", () => {
    const total = calculator.priceCalculateTotal(
      { [MenuItem.Red]: 1, [MenuItem.Green]: 1 },
      true,
    );

    expect(total).toBe(81);
  });

  it("4 Orange = 2 full pairs discounted", () => {
    const total = calculator.priceCalculateTotal({ [MenuItem.Orange]: 4 });

    expect(total).toBe(456);
  });

  it("5 Orange per bill: 2 pairs discounted + 1 full price", () => {
    const total = calculator.priceCalculateTotal({ [MenuItem.Orange]: 5 });

    expect(total).toBe(576);
  });

  it("non-bundle item (Red) never gets pair discount", () => {
    const total = calculator.priceCalculateTotal({ [MenuItem.Red]: 4 });

    expect(total).toBe(200);
  });

  it("bundle discount applies per item type, not combined", () => {
    const total = calculator.priceCalculateTotal({
      [MenuItem.Pink]: 2,
      [MenuItem.Green]: 2,
    });

    expect(total).toBe(228);
  });

  it("bundle + member discount stack: 576 * 0.9 = 518.4", () => {
    const total = calculator.priceCalculateTotal(
      { [MenuItem.Orange]: 5 },
      true,
    );

    expect(total).toBe(518.4);
  });

  it("zero quantity is ignored", () => {
    const total = calculator.priceCalculateTotal({
      [MenuItem.Red]: 0,
      [MenuItem.Blue]: 2,
    });

    expect(total).toBe(60);
  });

  it("mixed order + member card", () => {
    //! *0.9 = 385.2
    const total = calculator.priceCalculateTotal(
      { [MenuItem.Red]: 1, [MenuItem.Blue]: 1, [MenuItem.Orange]: 3 },
      true,
    );

    expect(total).toBe(385.2);
  });
});
