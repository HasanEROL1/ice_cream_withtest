import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen, fireEvent } from '../test-utils';
import Card from '../components/list/card';

const mockDispatch = vi.fn();
vi.mock('react-redux', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useDispatch: () => mockDispatch
    };
});

describe('Card Bileşeni', () => {
    const mockItem = {
        id: 'ca59',
        name: 'Çikolatalı Dondurma',
        price: 25,
        image: 'chocolate.jpg'
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('ürün bilgilerini göstermeli', () => {
        renderWithProviders(<Card item={mockItem} />);

        expect(screen.getByText('Çikolatalı Dondurma')).toBeInTheDocument();
        expect(screen.getByText(/25/)).toBeInTheDocument();
        expect(screen.getByTestId('add-to-cart-btn')).toBeInTheDocument();
    });

    it('sepete ekle butonu çalışmalı', () => {
        renderWithProviders(<Card item={mockItem} />);

        const addButton = screen.getByTestId('add-to-cart-btn');
        fireEvent.click(addButton);

        expect(mockDispatch).toHaveBeenCalled();
    });
});