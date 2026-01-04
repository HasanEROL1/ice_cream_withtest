import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen, fireEvent } from '../test-utils';
import Modal from '../components/modal';

describe('Modal Bileşeni', () => {
    const mockClose = vi.fn();

    const mockCart = [
        { id: 'ca59', name: 'Çikolatalı Dondurma', type: 'cup', price: 25, amount: 2 }
    ];

    it('modal açıkken render edilmeli', () => {
        renderWithProviders(
            <Modal isOpen={true} close={mockClose} />,
            {
                preloadedState: {
                    cart: mockCart
                }
            }
        );

        expect(screen.getByTestId('modal')).toBeInTheDocument();
        expect(screen.getByText('SEPETİM')).toBeInTheDocument();
    });

    it('modal kapalıyken render edilmemeli', () => {
        renderWithProviders(
            <Modal isOpen={false} close={mockClose} />,
            {
                preloadedState: {
                    cart: mockCart
                }
            }
        );

        expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    it('kapat butonu çalışmalı', () => {
        renderWithProviders(
            <Modal isOpen={true} close={mockClose} />,
            {
                preloadedState: {
                    cart: mockCart
                }
            }
        );

        const closeButton = screen.getByTestId('close');
        fireEvent.click(closeButton);

        expect(mockClose).toHaveBeenCalled();
    });
});