class Goal < ApplicationRecord
  belongs_to :user 

  validates :user_id, presence: true 
  validates :amount, presence: true, numericality: { greater_than: 0 }
  validates :description, presence: true, length: { maximum: 20 }
  validate :target_date_cannot_be_in_the_past

  after_create :calculate_progress 
  after_create :estimate_target_date

  def estimate_target_date 
    # Fetch the user's salary
    salary = user.salary_after_tax
    puts salary
    monthly_salary = salary / 12 
    monthly_estimated_savings = monthly_salary * 0.2

    # Calculate the amount of months needed to reach the goal 
    months_needed = self.amount / monthly_estimated_savings
    puts months_needed

    # Calculate the target date 
    target_date = Date.today + months_needed.to_i.months 
    puts target_date 

    # Update the target date
    self.target_date = target_date

    # Save the goal
    save 
  end

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
