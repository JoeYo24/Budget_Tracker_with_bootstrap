class Transaction < ApplicationRecord
    belongs_to :user
    belongs_to :goal, optional: true
    belongs_to :monthly_comparison, optional: true
    has_one :savings_transaction, dependent: :destroy

    after_destroy :update_monthly_comparisons_savings
    after_destroy :update_goal_progress

    TRANSACTION_TYPES = %w(Income Need Want Savings).freeze

    validates :user_id, presence: true
    validates :amount, presence: true, numericality: { greater_than: 0 }
    validates :transaction_type, presence: true, inclusion: { in: TRANSACTION_TYPES }
    validates :date, presence: true
    validates :description, presence: true, length: { maximum: 20 }
    validate :date_cannot_be_in_the_future

    private

    def update_monthly_comparisons_savings
      # Check if the transaction is a savings transaction
      return unless transaction_type == 'Savings'

      # Wrap the code in a transaction block
      Transaction.transaction do
        # Find the associated monthly record
        month = date.beginning_of_month
        monthly_comparison = user.monthly_comparisons.find_by(month: month)
        return unless monthly_comparison

        # Subtract the amount of the transaction being destroyed
        new_savings = monthly_comparison.savings - amount
        monthly_comparison.update(savings: new_savings)
      end
    end


    def update_goal_progress
      if goal && goal_id && savings_transaction.applied == true
        updated_progress = goal.progress - (amount / goal.amount) * 100
        goal.update(progress: updated_progress)
      end
    end

    def date_cannot_be_in_the_future
      if date.present? && date > Date.today
        errors.add(:date, "can't be in the future")
      end
    end
end
