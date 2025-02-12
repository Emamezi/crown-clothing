import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { FormContainer, PaymentFormContainer } from "./payment-form.styles";
import { useSelector } from "react-redux";
import { selectCartItemsTotal } from "../../store/cart/cart.selector";
import {
  selectCurrentUser,
  selectDisplayName,
} from "../../store/user/user.selectors";
import { useState } from "react";

function PaymentForm() {
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartItemsTotal);
  const currentUser = useSelector(selectCurrentUser);
  const displayName = useSelector(selectDisplayName);

  //stripe payment setup to netlify server
  async function paymentHandler(e) {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setPaymentProcessing(true);
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    const {
      paymentIntent: { client_secret },
    } = response;
    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? displayName : "Guest",
        },
      },
    });

    setPaymentProcessing(false);
    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("payment successful");
      }
    }
  }
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <CardElement />
        <Button
          isLoading={paymentProcessing}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          Pay Now
        </Button>
      </FormContainer>
    </PaymentFormContainer>
  );
}

export default PaymentForm;
