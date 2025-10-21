# React Native Cart Exam

## Reflection and Future Improvements

With more time, I would focus on making the cart and product logic more modular, scalable, and reliable:

1. **Persistent State** – Save cart data in async storage or sync with a backend to maintain continuity across sessions.
2. **Data Validation** – Add stock checks, prevent duplicates, and handle invalid product references before updating state.
3. **Derived State Logic** – Centralize subtotal, discount, and total computations in derived selectors for accuracy and performance.
4. **Voucher System** – Replace hardcoded rules with a modular, config-driven validation layer supporting multiple discount types.
5. **Atomic Updates** – Ensure add/remove actions update quantities and totals transactionally to avoid race conditions.
6. **Error Handling** – Introduce graceful fallbacks and clear user feedback for invalid operations or data sync issues.
7. **Feature Modularity** – Decouple cart, voucher, and product logic into separate store slices and utility modules to enable independent scaling and easier testing.
8. **Testing Coverage** – Add unit and integration tests for key cart flows, totals, and discount application logic.
9. **Performance Optimization** – Memoize computed values, minimize unnecessary re-renders, and streamline derived calculations.
10. **Extensibility** – Design the data layer to accommodate future features such as product variants, bundles, and promotional rules.
11. **Architecture** – Adopt a coherent architectural approach like Feature-Sliced Design for future scalability, maintainability, collaboration and better code clarity.
