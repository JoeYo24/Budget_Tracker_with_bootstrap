class AddMonthToMonthlyComparisons < ActiveRecord::Migration[6.1]
  def change
    add_column :monthly_comparisons, :month, :date
  end
end
