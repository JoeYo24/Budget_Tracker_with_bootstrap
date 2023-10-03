class Goal < ApplicationRecord
    belongs_to :user 

    validates :user_id, presence: true 
    validates :amount, presence: true, numericality: { greater_than: 0 }
    validates :description, presence: true, length: { maximum: 20 }
    validates :target_date, presence: true
    validate :target_date_cannot_be_in_the_past

    after_create :calculate_progress 

    private 

    def target_date_cannot_be_in_the_past
        if target_date.present? && target_date < Date.today
            errors.add(:target_date, "can't be in the past")
        end
    end

    def calculate_progress
        # Check if the user has any other goals
        other_goals = user.goals.where.not(id: id)
        
        if other_goals.empty?
          # Check if there are any related savings transactions
          relevant_savings_transactions = Transaction.where(transaction_type: "Savings")
        
          if relevant_savings_transactions.any?
            total_savings = relevant_savings_transactions.sum(:amount)
            new_progress = (total_savings / amount) * 100
      
            # Check if progress has changed
            if new_progress != self.progress
              self.progress = new_progress
              save
            end
          else
            # No savings transactions found, set progress to 0 or any other default value as needed
            if self.progress != 0
              self.progress = 0
              save
            end
          end
        else
          # This is not the first goal for the user; progress calculation is not needed
          self.progress = 0 
          save
        end
    end
      

end
