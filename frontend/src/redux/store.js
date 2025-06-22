import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import authApi from './features/auth/authApi';
import authReducer from './features/auth/authSlice';
import productsApi from './features/products/productsApi';
import reviewApi from './features/reviews/reviewApi';
import statsApi from './features/stats/statsApi';
import orderApi from './features/orders/Order.Api';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [reviewApi.reducerPath]: reviewApi.reducer,
        [statsApi.reducerPath]: statsApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            productsApi.middleware,
            orderApi.middleware,
            reviewApi.middleware,
            statsApi.middleware,
        ),
});

export default store;