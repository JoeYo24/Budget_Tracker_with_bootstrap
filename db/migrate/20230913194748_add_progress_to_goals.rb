class AddProgressToGoals < ActiveRecord::Migration[6.1]
  def change
    add_column :goals, :progress, :integer, default: 0, limit: 2
  end
end
