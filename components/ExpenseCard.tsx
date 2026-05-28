type Props = {
  title: string;
  amount: number;
  category: string;
};

export default function ExpenseCard({
  title,
  amount,
  category,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold">{title}</p>
          <p className="text-sm text-gray-500">
            {category}
          </p>
        </div>

        <p className="font-bold">
          ¥{amount.toLocaleString()}
        </p>
      </div>
    </div>
  );
}