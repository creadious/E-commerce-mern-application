import { CardElement } from "@stripe/react-stripe-js";
import styles from "./CheckoutForm.module.css";

const CheckoutForm = ({ price, items, address }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission
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
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
