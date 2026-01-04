// CartInfo.jsx - MOBİL responsive
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createOrder } from "../../redux/cartSlice";
import { toast } from "react-toastify";

const CartInfo = ({ cart, close }) => {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);

  const subTotal = cart.reduce((total, item) => total + item.price * item.amount, 0);
  const discountRate = 0.1;
  const discount = subTotal >= 1000 ? Number((subTotal * discountRate).toFixed(2)) : 0;
  const discountedSubTotal = Number((subTotal - discount).toFixed(2));
  const taxRate = 0.08;
  const tax = Number((discountedSubTotal * taxRate).toFixed(2));
  const shipping = subTotal > 200 || subTotal === 0 ? 0 : 20;
  const Total = Number((discountedSubTotal + tax + shipping).toFixed(2));

  const handleClick = () => {
    dispatch(createOrder());
    toast.success("Ürünler Hazırlanıyor...", {
      autoClose: 3000,
      pauseOnHover: true,
      draggable: true
    });

    if (close && typeof close === 'function') {
      setTimeout(() => close(), 300);
    }
  };

  const handleCloseClick = () => {
    if (close && typeof close === 'function') {
      close();
    }
  };

  return (
    <div className="h-full flex flex-col p-3 sm:p-4 lg:p-5 bg-gray-50">
      {/* Desktop için (lg+) */}
      <div className="hidden lg:block flex-1">
        <h3 className="text-xl font-bold mb-4 text-gray-800">SİPARİŞ ÖZETİ</h3>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Ara Toplam:</p>
            <p className="font-bold text-lg">{subTotal.toFixed(2)} ₺</p>
          </div>

          {subTotal >= 1000 && (
            <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg">
              <p className="text-green-700 font-semibold">İndirim (%10):</p>
              <p className="text-green-700 font-bold text-lg">- {discount} ₺</p>
            </div>
          )}

          <div className="flex justify-between items-center">
            <p className="text-gray-600">KDV (%8):</p>
            <p className="font-semibold">{tax} ₺</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-600">Kargo:</p>
            <div className="text-right">
              <p className={`font-bold text-lg ${shipping === 0 ? "text-green-600" : ""}`}>
                {shipping === 0 ? "ÜCRETSİZ" : `${shipping} ₺`}
              </p>
            </div>
          </div>

          {/* Toplam */}
          <div className="pt-3 border-t mt-3">
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold text-gray-800">TOPLAM TUTAR</p>
              <div className="text-2xl font-bold text-orange-600">{Total} ₺</div>
            </div>
          </div>
        </div>

        {/* Kargo bilgilendirme */}
        {subTotal > 0 && subTotal <= 200 && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 font-medium mb-2">
              200₺ üzeri alışverişlerde kargo bedava
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${Math.min((subTotal / 200) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {Math.max(200 - subTotal, 0).toFixed(2)} ₺ daha harcayın
            </p>
          </div>
        )}

        {subTotal > 200 && shipping === 0 && (
          <div className="mb-4 p-3 bg-green-50 rounded-lg">
            <p className="text-green-700 font-medium">
              🎉 Ücretsiz kargo kazandınız!
            </p>
          </div>
        )}

        {/* Notlar */}
        <div className="text-sm text-gray-600 mb-4">
          {subTotal >= 1000 ? (
            <p className="text-green-600 font-medium">✓ 1000₺ üzeri alışverişte %10 indirim uygulandı</p>
          ) : (
            <p>💡 {(1000 - subTotal).toFixed(2)} ₺ daha harcayın, %10 indirim kazanın</p>
          )}

          {subTotal > 200 ? (
            <p className="text-green-600 font-medium mt-2">✓ 200₺ üzeri alışverişte ücretsiz kargo uygulandı</p>
          ) : (
            <p className="mt-2">🚚 200₺ üzeri alışverişte ücretsiz kargo</p>
          )}
        </div>

        {/* BUTONLAR */}
        <div className="mt-auto">
          <button
            disabled={subTotal === 0}
            onClick={handleClick}
            className={`w-full py-3 rounded-lg text-lg font-bold transition-colors ${subTotal === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
          >
            {subTotal === 0 ? 'SEPET BOŞ' : 'SİPARİŞİ ONAYLA'}
          </button>

          {close && typeof close === 'function' && (
            <div className="mt-3">
              <button
                onClick={handleCloseClick}
                className="w-full py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
              >
                Alışverişe Devam Et
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MOBİL için (lg altı) */}
      <div className="lg:hidden">
        <div className="mb-3">
          <h3 className="text-lg font-bold mb-2 text-gray-800">SİPARİŞ ÖZETİ</h3>

          {/* Mobilde kompakt gösterim */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Toplam:</span>
              <span className="text-xl font-bold text-orange-600">{Total} ₺</span>
            </div>

            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {showDetails ? "Detayları gizle" : "Detayları göster"}
            </button>

            {showDetails && (
              <div className="space-y-1.5 bg-gray-100 p-2 rounded">
                <div className="flex justify-between text-sm">
                  <span>Ara Toplam:</span>
                  <span>{subTotal.toFixed(2)} ₺</span>
                </div>
                {subTotal >= 1000 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>İndirim:</span>
                    <span>- {discount} ₺</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>KDV:</span>
                  <span>{tax} ₺</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Kargo:</span>
                  <span className={shipping === 0 ? "text-green-600" : ""}>
                    {shipping === 0 ? "ÜCRETSİZ" : `${shipping} ₺`}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Kargo bar - mobil */}
          {subTotal > 0 && subTotal <= 200 && (
            <div className="mt-3 p-2 bg-blue-50 rounded">
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                <div
                  className="bg-green-500 h-1.5 rounded-full"
                  style={{ width: `${Math.min((subTotal / 200) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 text-center">
                {Math.max(200 - subTotal, 0).toFixed(2)} ₺ kaldı
              </p>
            </div>
          )}

          {subTotal > 200 && shipping === 0 && (
            <div className="mt-2 p-2 bg-green-50 rounded text-center">
              <p className="text-green-600 text-sm">✓ Ücretsiz Kargo</p>
            </div>
          )}
        </div>

        {/* Mobil butonlar */}
        <div className="space-y-2">
          <button data-testid="confirm-order-btn"
            disabled={subTotal === 0}
            onClick={handleClick}
            className={`w-full py-2.5 rounded-lg text-base font-bold transition-colors ${subTotal === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
          >
            {subTotal === 0 ? 'SEPET BOŞ' : 'SİPARİŞİ ONAYLA'}
          </button>

          {close && typeof close === 'function' && (
            <button data-testid="continue-shopping-btn"
              onClick={handleCloseClick}
              className="w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
            >
              Alışverişe Devam Et
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartInfo;