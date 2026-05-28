"use client";

import { useState } from "react";

type Expense = {
  id: number;
  title: string;
  amount: number;
  category: string;
};

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 1,
      title: "ランチ",
      amount: 1200,
      category: "食費",
    },
  ]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const addExpense = () => {
    const newExpense: Expense = {
      id: Date.now(),
      title,
      amount: Number(amount),
      category,
    };
    setExpenses([...expenses, newExpense]);

    setTitle("");
    setAmount("");
    setCategory("");
  };

  const deleteExpense = (id: number) => {
  　const filteredExpenses = expenses.filter(
    　(expense) => expense.id !== id
  　);

  　setExpenses(filteredExpenses);
　};

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold">
        家計簿アプリ
      </h1>

      <div className="mt-6 rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">
          支出追加
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="タイトル"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full rounded border p-2"
          />

          <input
            type="number"
            placeholder="金額"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            className="w-full rounded border p-2"
          />

          <input
            type="text"
            placeholder="カテゴリ"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full rounded border p-2"
          />

          <button
            onClick={addExpense}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            追加
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="rounded-xl bg-white p-4 shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">
                  {expense.title}
                </p>

                <p className="text-sm text-gray-500">
                  {expense.category}
                </p>
              </div>

              <div className="flex items-center gap-4">
  <p className="font-bold">
    ¥{expense.amount.toLocaleString()}
  </p>

  <button
    onClick={() => deleteExpense(expense.id)}
    className="rounded bg-red-500 px-3 py-1 text-sm text-white"
  >
    削除
  </button>
</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}