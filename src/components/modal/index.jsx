// Modal.jsx - MOBİL için responsive
import { IoClose } from "react-icons/io5"
import CartInfo from "./cart-info"
import CardItem from "./cart-item"
import { useSelector } from "react-redux"
import { useEffect } from "react"

const Modal = ({ isOpen, close }) => {
  const { cart } = useSelector((store) => store);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isOpen]);

  return (
    isOpen &&
    <div
      data-testid="modal"
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] overflow-y-auto"
    >
      <div className="min-h-full flex items-center justify-center p-2 sm:p-3">
        <div className="bg-white text-black rounded-xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">

          {/* Header - mobil küçük */}
          <div className="sticky top-0 z-20 border-b p-3 sm:p-4 flex justify-between items-center bg-white">
            <h2 className="font-bold text-lg sm:text-xl text-gray-800">SEPETİM</h2>
            <button
              className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-200 transition-colors"
              onClick={close}
              data-testid="close"
              aria-label="Kapat"
            >
              <IoClose size={20} className="sm:w-6 sm:h-6 text-gray-600" />
            </button>
          </div>

          {/* İçerik - mobilde dikey, desktop'ta yatay */}
          <div className="flex-1 flex flex-col lg:flex-row min-h-0">

            {/* SOL: Ürünler - mobilde tam genişlik */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:border-r">
              {cart.length === 0 ? (
                <div className="h-40 sm:h-48 flex flex-col items-center justify-center">
                  <div className="text-gray-400 mb-3 text-5xl sm:text-6xl">🛒</div>
                  <p className="text-gray-500 text-sm sm:text-base">Sepetinizde henüz ürün yok.</p>
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-700">
                    Sepetinizdeki Ürünler ({cart.length})
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {cart.map((item) => (
                      <CardItem
                        key={`${item.id}-${item.type || "cup"}`}
                        item={item}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* SAĞ: CartInfo - mobilde altta, desktop'ta sağda */}
            <div className="lg:w-80 flex-shrink-0 border-t lg:border-t-0 lg:border-l">
              <CartInfo cart={cart} close={close} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal