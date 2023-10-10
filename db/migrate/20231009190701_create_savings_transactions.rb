class CreateSavingsTransactions < ActiveRecord::Migration[6.1]
  def change
    create_table :savings_transactions do |t|
      t.references :user, foreign_key: true
      t.decimal :amount, precision: 10, scale: 2
      t.string :description 
      t.date :date
      t.references :goal, foreign_key: true, null: true
      t.boolean :applied, default: false
      t.timestamps
    end
  end
end
