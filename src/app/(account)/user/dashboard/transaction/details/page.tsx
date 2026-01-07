import TransactionDetails from "../components/TransactionDetails";

export default function Page() {
  const mockOrder = { id: 1, total: 100 }; // Example data
  return <TransactionDetails order={mockOrder} role="buyer" />;
}