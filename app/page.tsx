import ExpenseCard from "@/components/ExpenseCard";
import { expenses } from "@/data/expenses";

export default function Home() {
  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold">
        家計簿アプリ
      </h1>

      <div className="mt-6 rounded-2xl bg-blue-500 p-6 text-white">
        <p className="text-sm">今月の支出</p>

        <p className="mt-2 text-4xl font-bold">
          ¥{total.toLocaleString()}
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {expenses.map((expense) => (
          <ExpenseCard
            key={expense.id}
            title={expense.title}
            amount={expense.amount}
            category={expense.category}
          />
        ))}
      </div>
    </main>
  );
}