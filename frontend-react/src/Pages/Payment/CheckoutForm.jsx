import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import styles from "./CheckoutForm.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import useAuth from "../../hook/useAuth";
import Swal from "sweetalert2";
import useCartItems from "../../hook/useCartItems";

const CheckoutForm = ({ price, itemIds, address, paymentMethod }) => {
  // console.log({ price, items, address, paymentMethod });

  const [_1, _2, cartRefetch] = useCartItems();

  const { user } = useAuth();

  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (price > 0) {
      axiosSecure
        .post("/orders/create-payment-intent", { items: itemIds })
        .then((res) => {
          console.log("client secret", res?.data?.data?.clientSecret);
          setClientSecret(res?.data?.data?.clientSecret);
        })
        .catch((error) => {
          console.log("card payment error:", error);
        });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("error", error);
      setCardError(error.message);
    } else {
      setCardError("");
      // console.log('payment method', paymentMethod)
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }

    console.log("payment intent", paymentIntent);
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      // save payment information to the server
      const payment = {
        paymentMethod: paymentMethod,
        addressId: address,
        paymentTransaction: paymentIntent.id,
        items: itemIds,
      };
      // console.log('payment item', payment)
      axiosSecure.post(`/orders/payment`, payment).then((res) => {
        console.log(res.data);
        cartRefetch();
        navigate("/shop");
        Swal.fire({
          icon: "success",
          title: `Payment successful`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[30rem]">
      <form
        className="w-full max-w-md p-8 bg-red-200 shadow-lg rounded-lg"
        onSubmit={handleSubmit}
      >
        <div>
          <h1 className="text-2xl font-bold text-center">Payment Gateway</h1>
          <div className="pt-10 flex justify-between text-xl font-medium">
            <p>Total Price:</p>
            <p>₹{price}</p>
          </div>
        </div>
        <div className="mb-4">
          <label
            className={`block text-gray-700 text-sm font-semibold my-2`}
            htmlFor="card-element"
          >
            Credit or Debit Card
          </label>
          <CardElement
            id="card-element"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                  padding: "10px 12px",
                  "border-radius": "6px",
                  "background-color": "#f7fafc",
                  border: "1px solid #e2e8f0",
                  "box-shadow": "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
            className={`p-2 rounded border border-gray-300 ${styles.StripeElement}`}
          />
        </div>
        <button
          className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${styles.button}`}
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
        {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
        {transactionId && (
          <p className="text-green-500">
            Transaction complete with transactionId: {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
