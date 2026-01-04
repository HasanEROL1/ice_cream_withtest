import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen, fireEvent } from '../test-utils';
import AmountPicker from '../components/modal/amount-picker';

const mockDispatch = vi.fn();
vi.mock('react-redux', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useDispatch: () => mockDispatch
    };
});

describe('AmountPicker Bileşeni', () => {
    const mockItem = {
        id: 'ca59',
        type: 'cup',
        amount: 5,
        price: 25
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('başlangıç miktarı ile render edilmeli', () => {
        renderWithProviders(<AmountPicker item={mockItem} />);

        expect(screen.getByDisplayValue('5')).toBeInTheDocument();
    });

    it('+ butonuna tıklandığında miktar artmalı', () => {
        renderWithProviders(<AmountPicker item={mockItem} />);

        const increaseButton = screen.getByText('+');
        fireEvent.click(increaseButton);

        expect(mockDispatch).toHaveBeenCalled();
    });

    it('- butonuna tıklandığında miktar azalmalı', () => {
        renderWithProviders(<AmountPicker item={mockItem} />);

        const decreaseButton = screen.getByText('-');
        fireEvent.click(decreaseButton);

        expect(mockDispatch).toHaveBeenCalled();
    });
});