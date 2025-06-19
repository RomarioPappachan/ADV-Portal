"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { createRazorPayOrder, verifyRazorpayPayment } from "@/api/razorpay";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RazorpayButton({
  buttonStyle,
  amount,
  category,
  payment_type,
}) {
  const { userInfo } = useAuthStore();
  const router = useRouter();

  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    const loadOrderdata = () => {
      setOrderData({
        adv_id: userInfo?.id,
        customer_name: userInfo?.fullname,
        customer_email: userInfo?.email,
        customer_mobile: userInfo?.mobile,
        amount: amount,
        category: category,
        payment_type: payment_type,
      });
    };
    loadOrderdata();
  }, []);

  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);

  const handlePayment = async () => {
    try {
      const res = await createRazorPayOrder(orderData);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // replace with your test key
        amount: res.data?.order?.amount,
        currency: res.data?.order?.currency,
        name: "Demo Company",
        description: "Test Transaction",
        order_id: res.data?.orderId,
        handler: async (response) => {
          if (response.razorpay_payment_id) {
            const {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            } = response;

            const paymentIds = {
              order_id: razorpay_order_id,
              payment_id: razorpay_payment_id,
              signature: razorpay_signature,
            };

            const paymentRes = await verifyRazorpayPayment(paymentIds);
            toast.success(res.data?.message);
            window.location.reload("/home/services/subscription");
          } else {
            alert("Ids not saved");
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <button onClick={handlePayment} className={buttonStyle}>
      Pay ₹{amount}
    </button>
  );
}
