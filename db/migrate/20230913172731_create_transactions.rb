class CreateTransactions < ActiveRecord::Migration[6.1]
  def change
    create_table :transactions do |t|
      t.references :user, null: false, foreign_key: true
      t.string :description
      t.decimal :amount
      t.string :transaction_type

      t.timestamps
    end
  end
end
