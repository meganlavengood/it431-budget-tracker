import { useState } from "react";
import type { Category } from "../types";

interface TransactionFormProps {
	onAddTransaction: (description: string, amount: number, category: Category, type: "income" | "expense") => void;
}

const expenseCategories: Category[] = ["Food", "Transport", "Entertainment", "Shopping", "Bills", "Other"];

function TransactionForm({ onAddTransaction }: TransactionFormProps) {
	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState("");
	const [category, setCategory] = useState<Category>("Food");
	const [type, setType] = useState<"income" | "expense">("expense");

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		// convert string to number
		const parsedAmount = parseFloat(amount);

		// validation
		if (!description.trim()) return;
		if (isNaN(parsedAmount) || parsedAmount <= 0) return;

		// pass stuff to the program
		onAddTransaction(description.trim(), parsedAmount, category, type);

		// after submit, reset the values to initial
		setDescription("");
		setAmount("");
		setCategory("Food");
	}

	return (
		<div className="form-card">
			<h2>➕ Add Transaction</h2>
			<form onSubmit={handleSubmit}>
				{/* transaction income/expense toggle */}
				<div className="type-toggle">
					<button
						type="button"
						className={`type-btn ${type === "expense" ? "active-expense" : ""}`}
						onClick={() => {
							setType("expense");
							setCategory("Food");
						}}>
						Expense
					</button>
					<button
						type="button"
						className={`type-btn ${type === "income" ? "active-income" : ""}`}
						onClick={() => {
							setType("income");
							setCategory("Income");
						}}>
						Income
					</button>
				</div>

				{/* Description Input */}
				<div className="form-group">
					<label htmlFor="description">Description</label>
					<input id="description" type="text" placeholder="e.g., Grocery shopping" value={description} onChange={(e) => setDescription(e.target.value)} />
				</div>

				{/* Amount Input */}
				<div className="form-group">
					<label htmlFor="amount">Amount ($)</label>
					<input id="amount" type="number" placeholder="0.00" min="0.01" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
				</div>

				{/* Category Dropdown (only shown for expenses) */}
				{type === "expense" && (
					<div className="form-group">
						<label htmlFor="category">Category</label>
						<select id="category" value={category} onChange={(e) => setCategory(e.target.value as Category)}>
							{/* use expenseCategories as options */}
							{expenseCategories.map((cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>
					</div>
				)}

				<button type="submit" className="submit-btn">
					Add {type === "income" ? "income" : "expense"}
				</button>
			</form>
		</div>
	);
}

export default TransactionForm;
