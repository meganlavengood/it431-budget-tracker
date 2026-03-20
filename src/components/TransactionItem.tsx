import type { Transaction, Category } from "../types";

interface TransactionItemProps {
	transaction: Transaction;
	onDelete: (id: number) => void;
}

const categoryEmojis: Record<Category, string> = {
	Food: "🍔",
	Transport: "🚗",
	Entertainment: "🎮",
	Shopping: "🛍️",
	Bills: "📄",
	Income: "💵",
	Other: "📦",
};

const categoryClasses: Record<Category, string> = {
	Food: "food",
	Transport: "transport",
	Entertainment: "entertainment",
	Shopping: "shopping",
	Bills: "bills",
	Income: "income-cat",
	Other: "other",
};

function TransactionItem({ transaction, onDelete }: TransactionItemProps) {
	// not sure where the below came from, whether I added it on accident or it was in the default files, but it was causing errors so I commented it out and didn't see any negative effects
	// const formatCurrency = (amount: number): string => {
	// 	return "$" + amount.toFixed(2);
	// };

	return (
		<div className="transaction-item">
			<div className="transaction-info">
				{<div className={`category-icon ${categoryClasses[transaction.category]}`}>{categoryEmojis[transaction.category]}</div>}
				<div className="transaction-details">
					<div className="transaction-description">{transaction.description}</div>
					<div className="transaction-meta">
						<span>{transaction.category}</span>
						<span>•</span>
						<span>{transaction.date}</span>
					</div>
				</div>
			</div>
			<div className="transaction-right">
				<span className="className={`transaction-amount ${transaction.type}`}">{transaction.type === "expense" ? "–" : "+"}</span>
				<button className="delete-btn" title="Delete transaction" onClick={() => onDelete(transaction.id)}>
					×
				</button>
			</div>
		</div>
	);
}

export default TransactionItem;
