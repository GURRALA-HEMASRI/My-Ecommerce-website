import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight, CreditCard, Truck, CircleCheck as CheckCircle, Lock } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { api } from '../data/api'

const steps = ['Shipping', 'Payment', 'Review']

export default function CheckoutPage() {
  const [step, setStep] = useState(0)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber] = useState(() => `SE-${Math.random().toString(36).substr(2, 8).toUpperCase()}`)
  const [shipping, setShipping] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: 'US',
  })
  const [payment, setPayment] = useState({
    cardNumber: '', cardName: '', expiry: '', cvv: '',
  })

  const { items, totalPrice, clearCart } = useCart()

  const shippingFee = totalPrice > 50 ? 0 : 9.99
  const tax = totalPrice * 0.08
  const orderTotal = totalPrice + shippingFee + tax

  const navigate = useNavigate()

  const setS = (k) => (e) => setShipping(p => ({ ...p, [k]: e.target.value }))
  const setP = (k) => (e) => setPayment(p => ({ ...p, [k]: e.target.value }))

  const handlePlaceOrder = async (e) => {
    e.preventDefault()

    try {
      await api.createOrder(items, orderTotal)

      setOrderPlaced(true)
      clearCart()
    } catch (error) {
      console.error(error)
      alert("Failed to place order")
    }
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-500 mb-2">Thank you for your purchase.</p>
          <p className="text-sm font-medium text-gray-700 mb-6">
            Order #<span className="text-orange-500">{orderNumber}</span>
          </p>
          <p className="text-sm text-gray-500 mb-8">
            A confirmation email has been sent to <strong>{shipping.email}</strong>
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              to="/"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              to="/orders"
              className="border border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              View Orders
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link to="/products" className="text-orange-500 hover:text-orange-600 font-semibold">
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

        {/* Progress steps */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <button
                onClick={() => i < step && setStep(i)}
                className={`flex items-center gap-2 ${i < step ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  i < step ? 'bg-green-500 text-white' :
                  i === step ? 'bg-orange-500 text-white' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${i === step ? 'text-orange-500' : i < step ? 'text-green-600' : 'text-gray-400'}`}>
                  {s}
                </span>
              </button>
              {i < steps.length - 1 && (
                <ChevronRight className="w-4 h-4 text-gray-300 mx-2 sm:mx-3" />
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Forms */}
          <div className="flex-1">
            {/* Shipping form */}
            {step === 0 && (
              <form
                onSubmit={(e) => { e.preventDefault(); setStep(1) }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex items-center gap-2 mb-5">
                  <Truck className="w-5 h-5 text-orange-500" />
                  <h2 className="font-bold text-gray-900 text-lg">Shipping Address</h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'First Name', key: 'firstName', col: 1 },
                    { label: 'Last Name', key: 'lastName', col: 1 },
                    { label: 'Email', key: 'email', col: 2, type: 'email' },
                    { label: 'Phone', key: 'phone', col: 2, type: 'tel' },
                    { label: 'Address', key: 'address', col: 2 },
                    { label: 'City', key: 'city', col: 1 },
                    { label: 'State', key: 'state', col: 1 },
                    { label: 'ZIP Code', key: 'zip', col: 1 },
                  ].map(({ label, key, col, type = 'text' }) => (
                    <div key={key} className={col === 2 ? 'col-span-2' : ''}>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                      <input
                        type={type}
                        value={shipping[key]}
                        onChange={setS(key)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                        required
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                    <select
                      value={shipping.country}
                      onChange={setS('country')}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 transition-all"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  Continue to Payment <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Payment form */}
            {step === 1 && (
              <form
                onSubmit={(e) => { e.preventDefault(); setStep(2) }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex items-center gap-2 mb-5">
                  <CreditCard className="w-5 h-5 text-orange-500" />
                  <h2 className="font-bold text-gray-900 text-lg">Payment Details</h2>
                  <div className="ml-auto flex items-center gap-1 text-xs text-gray-400">
                    <Lock className="w-3 h-3" /> Secure
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Card Number</label>
                    <input
                      type="text"
                      value={payment.cardNumber}
                      onChange={setP('cardNumber')}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Cardholder Name</label>
                    <input
                      type="text"
                      value={payment.cardName}
                      onChange={setP('cardName')}
                      placeholder="John Doe"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Expiry Date</label>
                      <input
                        type="text"
                        value={payment.expiry}
                        onChange={setP('expiry')}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">CVV</label>
                      <input
                        type="text"
                        value={payment.cvv}
                        onChange={setP('cvv')}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  Review Order <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Review */}
            {step === 2 && (
              <form onSubmit={handlePlaceOrder} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-bold text-gray-900 text-lg mb-5">Review Your Order</h2>

                {/* Shipping summary */}
                <div className="p-4 bg-gray-50 rounded-xl mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-700 text-sm">Shipping to</span>
                    <button type="button" onClick={() => setStep(0)} className="text-orange-500 text-xs font-medium">Edit</button>
                  </div>
                  <p className="text-sm text-gray-600">{shipping.firstName} {shipping.lastName}</p>
                  <p className="text-sm text-gray-600">{shipping.address}, {shipping.city}, {shipping.state} {shipping.zip}</p>
                </div>

                {/* Payment summary */}
                <div className="p-4 bg-gray-50 rounded-xl mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-700 text-sm">Payment</span>
                    <button type="button" onClick={() => setStep(1)} className="text-orange-500 text-xs font-medium">Edit</button>
                  </div>
                  <p className="text-sm text-gray-600">Card ending in {payment.cardNumber.slice(-4) || '****'}</p>
                </div>

                {/* Items */}
                <div className="space-y-3 mb-5">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-3 items-center">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.name}</p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3.5 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 text-base"
                >
                  <Lock className="w-4 h-4" /> Place Order · ${orderTotal.toFixed(2)}
                </button>
              </form>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3 text-sm mb-4 max-h-48 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center gap-2">
                    <span className="text-gray-600 line-clamp-1 flex-1">{item.name} ×{item.quantity}</span>
                    <span className="font-medium text-gray-900 flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm pt-3 border-t border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span><span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shippingFee === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
                    {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span><span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
                  <span>Total</span><span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
