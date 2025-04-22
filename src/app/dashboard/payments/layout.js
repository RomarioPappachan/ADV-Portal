import PaymentNavbar from "@/components/payments/PaymentNavbar";

function PaymentLayout({ children }) {
  return (
    <div>
      <PaymentNavbar />
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default PaymentLayout;
