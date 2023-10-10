class AddGoalIdToTransactions < ActiveRecord::Migration[6.1]
  def change
    add_column :transactions, :goal_id, :integer
  end
end
