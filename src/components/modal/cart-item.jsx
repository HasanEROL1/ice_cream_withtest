
import { useDispatch } from "react-redux";
import { IoTrash } from 'react-icons/io5';
import { removeFromCart, updateCartAmount } from "../../redux/cartSlice";
import { useState } from 'react';

const CardItem = ({ item }) => {
  const dispatch = useDispatch();
  const [localAmount, setLocalAmount] = useState(item.amount);
  const totalPrice = item.amount * item.price;

  const handleAmountChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setLocalAmount(value);

    if (value >= 1) {
      dispatch(updateCartAmount({
        id: item.id,
        type: item.type,
        amount: value
      }));
    }
  };

  const handleBlur = () => {
    if (localAmount < 1) {
      const newAmount = 1;
      setLocalAmount(newAmount);
      dispatch(updateCartAmount({
        id: item.id,
        type: item.type,
        amount: newAmount
      }));
    }
  };

  const updateAmount = (newAmount) => {
    if (newAmount < 1) {
      dispatch(removeFromCart({ id: item.id, type: item.type }));
    } else {
      setLocalAmount(newAmount);
      dispatch(updateCartAmount({
        id: item.id,
        type: item.type,
        amount: newAmount
      }));
    }
  };

  return (
    <div data-testid={`cart-item-${item.id}-${item.type}`}
    className="flex items-center gap-2 p-2 border rounded bg-white text-xs sm:text-sm">
      {/* Resim */}
      <img
        src={item.image}
        alt={item.name}
        className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded border"
      />

      {/* Bilgiler */}
      <div className="flex-1 min-w-0">
        {/* Üst satır */}
        <div className="flex justify-between items-start mb-1">
          <div className="min-w-0 pr-1">
            <h3 className="font-semibold text-gray-800 truncate">
              {item.name}
            </h3>
            <div className="flex items-center gap-1 mt-0.5">
              <span className={`px-1.5 py-0.5 rounded ${item.type === "cup"
                ? "bg-blue-100 text-blue-800"
                : "bg-amber-100 text-amber-800"
                }`}>
                {item.type === "cup" ? "Bardak" : "Külah"}
              </span>
              <span className="text-gray-500">
                Birim: {item.price} ₺
              </span>
            </div>
          </div>

          <div className="text-right shrink-0 ml-1">
            <div className="font-bold text-gray-800">
              {totalPrice.toFixed(2)} ₺
            </div>
          </div>
        </div>

        {/* Alt satır - INPUT'lu miktar kontrolü */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Miktar kontrolü - INPUT ile */}
            <div className="flex items-center bg-gray-100 rounded">
              <button data-testid={`remove-btn-${item.id}-${item.type}`}
                onClick={() => updateAmount(item.amount - 1)}
                disabled={item.amount <= 1}
                className="w-6 h-6 flex items-center justify-center rounded-l text-gray-700 hover:bg-gray-200 disabled:text-gray-400"
              >
                -
              </button>

              <input
                data-testid={`amount-input-${item.id}-${item.type}`}
                type="number"
                min="1"
                value={localAmount}
                onChange={handleAmountChange}
                onBlur={handleBlur}
                className="w-10 h-6 text-center border-x border-gray-300 bg-white font-semibold outline-none text-xs"
              />

              <button
                data-testid={`increase-btn-${item.id}-${item.type}`}
                onClick={() => updateAmount(item.amount + 1)}
                className="w-6 h-6 flex items-center justify-center rounded-r text-gray-700 hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          <button
          
            onClick={() => dispatch(removeFromCart({ id: item.id, type: item.type }))}
            className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded"
          >
            <IoTrash size={12} className="sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardItem;