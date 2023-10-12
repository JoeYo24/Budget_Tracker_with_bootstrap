class SavingsTransaction < ApplicationRecord
  belongs_to :user
  belongs_to :goal, optional: true
  belongs_to :related_transaction, class_name: 'Transaction', foreign_key: 'transaction_id'

  validates :amount, presence: true, numericality: { greater_than: 0 }
  validates :date, presence: true

  after_create :update_savings

  private

  def update_savings
    if goal_id.nil?
      user.update(bank_savings: user.bank_savings + amount)
      return
    end
    goal = user.goals.find_by(id: self.goal_id)
    puts "goal: #{goal}"

    unapplied_savings_transactions = user.savings_transactions.where(goal_id: goal, applied: false)
    puts "unapplied_savings_transactions: #{unapplied_savings_transactions}"

    if unapplied_savings_transactions.any?
      total_savings = unapplied_savings_transactions.sum(:amount)
      updated_progress = goal.progress + (total_savings / goal.amount) * 100
      goal.update(progress: updated_progress)
      puts "updated_progress: #{updated_progress}"

      # Update applied flag for the savings transactions
      unapplied_savings_transactions.update_all(applied: true)

      if updated_progress >= 100
        puts "Goal with id #{goal.id} has been completed."
        goal.destroy
      end
    else
      puts "No unapplied savings transactions found for goal with id #{goal.id}."
    end
  end
end
