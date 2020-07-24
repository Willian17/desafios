import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string,
  value: number,
  type: 'income' | 'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (title === '') {
      throw Error('Invalid title entry. Fill some transaction description in title.')
    }

    if (typeof value !== 'number') {
      throw Error('Invalid value entry. Type must be numeric')
    }

    if (type !== 'income' && type !== 'outcome') {
      throw Error('Invalid type entry. Type must be income or outcome.');
    }

    if (type === 'outcome') {
      const { total } = this.transactionsRepository.getBalance()

      if (value > total) {
        throw Error(
          `Sorry, but the amount requested is greater than your bank balance. $${total}.`,
        );
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type
    })
    return transaction
  }
}

export default CreateTransactionService;
