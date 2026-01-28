import TransactionDetails from "../components/TransactionDetails";
interface TransactionDetailsProps {
  order: {
    id: number;
    total: number;
  };
  role: "buyer" | "seller"; // Using a union type for better safety
}
export default function Page() {
  const mockOrder = { id: 1, total: 100 }; // Example data
  return <TransactionDetails order={mockOrder} role="buyer" />;
}