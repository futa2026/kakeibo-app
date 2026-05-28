"use client";

import { useState, useEffect } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Expense = {
  id: number;
  title: string;
  amount: number;
  category: string;
};

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("expenses");
    if (saved) setExpenses(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const addExpense = () => {
    if (!title || !amount || !category) {
      alert("全て入力してください");
      return;
    }

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

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const totalAmount = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  const categorySummary = expenses.reduce((acc, expense) => {
    const category = expense.category;

    if (!acc[category]) {
      acc[category] = 0;
    }

    acc[category] += expense.amount;

    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categorySummary).map(
    ([category, amount]) => ({
      category,
      amount,
    })
  );

  const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
  ];

  const categories = [
    "食費",
    "交通費",
    "趣味",
    "日用品",
  ];


  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold">
        家計簿アプリ
      </h1>

      <div className="mt-4 rounded-xl bg-blue-500 p-4 text-white">
        <p className="text-sm">今月の支出</p>
        <p className="text-2xl font-bold">
          ¥{totalAmount.toLocaleString()}
        </p>
      </div>

      <div className="mt-6 rounded-xl bg-white p-4 shadow">
        <h2 className="mb-2 font-bold">カテゴリ別集計</h2>

        <div className="space-y-2">
          {Object.entries(categorySummary).map(
            ([category, amount]) => (
              <div
                key={category}
                className="flex justify-between"
              >
                <span>{category}</span>
                <span className="font-bold">
                  ¥{amount.toLocaleString()}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-white p-4 shadow">
        <h2 className="mb-4 font-bold">
          支出グラフ
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[index % COLORS.length]
                    }
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

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

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full rounded border p-2"
          >
            <option value="">
              カテゴリを選択
            </option>

            <option value="食費">
              食費
            </option>

            <option value="交通費">
              交通費
            </option>

            <option value="趣味">
              趣味
            </option>

            <option value="日用品">
              日用品
            </option>
          </select>

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