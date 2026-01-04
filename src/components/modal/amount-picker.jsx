// amount-picker.jsx - TEST DOSTU VERSİYON
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCartAmount } from "../../redux/cartSlice";

export const AmountPicker = ({ item, testId }) => {
    const dispatch = useDispatch();
    const [amount, setAmount] = useState(item.amount || 1);

    const handleDelete = () => {
        if (amount > 1) {
            const newAmount = amount - 1;
            setAmount(newAmount);
            dispatch(updateCartAmount({
                id: item.id,
                type: item.type,
                amount: newAmount
            }));
        }
    };

    const handleAdd = () => {
        const newAmount = amount + 1;
        setAmount(newAmount);
        dispatch(updateCartAmount({
            id: item.id,
            type: item.type,
            amount: newAmount
        }));
    };

    const handleChange = (e) => {
        const value = parseInt(e.target.value) || 1;
        setAmount(value);
        dispatch(updateCartAmount({
            id: item.id,
            type: item.type,
            amount: value
        }));
    };

    return (
        <div className="flex items-center bg-gray-100 rounded" data-testid={testId}>
            <button
                onClick={handleDelete}
                disabled={amount <= 1}
                className={`w-6 h-6 flex items-center justify-center rounded-l text-gray-700 hover:bg-gray-200 disabled:text-gray-400`}
                aria-label="Azalt"
                data-testid={`${testId}-decrease`}
            >
                -
            </button>

            <input
                type="number"
                min="1"
                value={amount}
                onChange={handleChange}
                className="w-10 h-6 text-center border-x border-gray-300 bg-white font-semibold outline-none text-xs"
                data-testid={`${testId}-input`}
            />

            <button
                onClick={handleAdd}
                className="w-6 h-6 flex items-center justify-center rounded-r text-gray-700 hover:bg-gray-200"
                aria-label="Arttır"
                data-testid={`${testId}-increase`}
            >
                +
            </button>
        </div>
    );
};

export default AmountPicker;