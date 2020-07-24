import Transaction from '../models/Transaction';


interface createTransitionData {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface ListTransitionsData {
  transactions: Transaction[];
  balance: Balance
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): ListTransitionsData {
    const listTransitions = {
      transactions: this.transactions,
      balance: this.getBalance()
    }
    return listTransitions
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (types, transaction) => {
        const { income = 0, outcome = 0 } = types;
        if (transaction.type === 'income') {
          return { ...types, income: income + transaction.value };
        }
        return { ...types, outcome: outcome + transaction.value };
      },
      { income: 0, outcome: 0 },
    );

    const balance = {
      income,
      outcome,
      total: income - outcome
    }
    return balance
  }

  public create({title , type , value} : createTransitionData): Transaction {
    const transaction = new Transaction({title, value , type})

    this.transactions.push(transaction)

    return transaction
  }
}

export default TransactionsRepository;
