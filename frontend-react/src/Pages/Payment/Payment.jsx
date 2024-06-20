import { useLocation } from "react-router-dom";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const location = useLocation();
  const { state } = location;

  const items = state?.cartItems;

  const total = items.reduce((sum, item) => {
    return sum + item?.offerPrice * item?.quantity;
  }, 0);

  return (
    <div className="md:mt-28 mt-16 md:px-0 px-2 min-h-screen xl:w-[1200px] mx-auto pb-8">
      <Elements stripe={stripePromise}>
        <CheckoutForm price={total} items={items} address={state.address} />
      </Elements>
    </div>
  );
};

export default Payment;
