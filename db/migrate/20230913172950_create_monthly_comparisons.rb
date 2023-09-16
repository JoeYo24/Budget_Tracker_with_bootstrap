class CreateMonthlyComparisons < ActiveRecord::Migration[6.1]
  def change
    create_table :monthly_comparisons do |t|
      t.references :user, null: false, foreign_key: true
      t.decimal :savings

      t.timestamps
    end
  end
end
