class AddTransactionIdToSavingsTransactions < ActiveRecord::Migration[6.1]
  def change
    add_reference :savings_transactions, :transaction, null: false, foreign_key: true
  end
end
