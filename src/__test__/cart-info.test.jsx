import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithProviders, screen, fireEvent } from '../test-utils';
import CartInfo from '../components/modal/cart-info';

vi.mock('react-toastify', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
        info: vi.fn(),
        warning: vi.fn()
    }
}));

const mockDispatch = vi.fn();
vi.mock('react-redux', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useDispatch: () => mockDispatch
    };
});

describe('CartInfo Bileşeni', () => {
    const mockCart = [
        { id: 'ca59', name: 'Dondurma 1', type: 'cup', price: 25, amount: 2 },
        { id: '5a6e', name: 'Dondurma 2', type: 'cone', price: 30, amount: 1 }
    ];

    const mockClose = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('boş sepet durumunda "SEPET BOŞ" butonu gösterilmeli', () => {
        renderWithProviders(<CartInfo cart={[]} close={mockClose} />);

        const orderButton = screen.getByTestId('confirm-order-btn');
        expect(orderButton).toHaveTextContent('SEPET BOŞ');
        expect(orderButton).toBeDisabled();
    });

    it('dolu sepet durumunda toplam tutarı göstermeli', () => {
        renderWithProviders(<CartInfo cart={mockCart} close={mockClose} />);

        // Toplam: (2*25) + (1*30) = 80
        expect(screen.getByText(/80\.00/)).toBeInTheDocument();
    });

    it('sipariş onayla butonu çalışmalı', () => {
        renderWithProviders(<CartInfo cart={mockCart} close={mockClose} />);

        const orderButton = screen.getByTestId('confirm-order-btn');
        fireEvent.click(orderButton);

        expect(mockDispatch).toHaveBeenCalled();
    });

    it('alışverişe devam et butonu çalışmalı', () => {
        renderWithProviders(<CartInfo cart={mockCart} close={mockClose} />);

        const continueButton = screen.getByTestId('continue-shopping-btn');
        fireEvent.click(continueButton);

        expect(mockClose).toHaveBeenCalled();
    });
});