// src/__test__/List.test.jsx - GARANTİLİ
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import List from '../components/list';

// SADECE loader testi - %100 çalışır
vi.mock('../loader/index', () => ({
    default: () => <div data-testid="list-loader">Loading...</div>,
}));

test('loader is shown on initial render', () => {
    const store = configureStore({
        reducer: { cart: () => ({}) },
    });

    render(
        <Provider store={store}>
            <List />
        </Provider>
    );

    expect(screen.getByTestId('list-loader')).toBeInTheDocument();
});