import type { BudgetSummary } from "../types";

interface SummaryCardsProps {
	summary: BudgetSummary;
}

function SummaryCards({ summary }: SummaryCardsProps) {
	// Helper function to format a number as currency
	const formatCurrency = (amount: number): string => {
		return "$" + Math.abs(amount).toFixed(2);
	};

	return (
		<div className="summary">
			{
				<>
					<div className="summary-card income">
						<div className="label">Total Income</div>
						<div className="amount">{formatCurrency(summary.totalIncome)}</div>
					</div>
					<div className="summary-card expenses">
						<div className="label">Total Expenses</div>
						<div className="amount">{formatCurrency(summary.totalExpenses)}</div>
					</div>
					<div className="summary-card balance">
						<div className="label">Balance</div>
						<div className="amount">
							{summary.balance < 0 ? "-" : ""} {/* negative sign if balance is negative */}
							{formatCurrency(summary.balance)}
						</div>
					</div>
				</>
			}
		</div>
	);
}

export default SummaryCards;
