class Goal < ApplicationRecord
  belongs_to :user 

  validates :user_id, presence: true 
  validates :amount, presence: true, numericality: { greater_than: 0 }
  validates :description, presence: true, length: { maximum: 20 }
  validate :target_date_cannot_be_in_the_past

  after_create :estimate_target_date

  def estimate_target_date
    # Fetch the user's salary
    salary = user.salary_after_tax
    puts "Salary: #{salary}"
  
    # Ensure the salary is greater than zero to avoid division by zero
    if salary > 0
      monthly_salary = salary / 12
      monthly_estimated_savings = monthly_salary * 0.2
  
      # Ensure that monthly_estimated_savings is greater than zero
      if monthly_estimated_savings > 0
        # Calculate the amount of months needed to reach the goal (rounding up)
        months_needed = (self.amount / monthly_estimated_savings).ceil
        puts "Months Needed: #{months_needed}"
  
        # Calculate the target date
        target_date = Date.today + months_needed.months
        puts "Target Date: #{target_date}"
  
        # Check if there are any previous goals created
        previous_goals = user.goals.where('created_at < ?', self.created_at)
  
        if previous_goals.any?
          # Find the most recent previous goal
          most_recent_previous_goal = previous_goals.order(created_at: :desc).first
  
          # Adjust the target date based on the most recent previous goal's target date
          if most_recent_previous_goal && most_recent_previous_goal.target_date
            target_date = [target_date, most_recent_previous_goal.target_date].max
          end
        end
  
        # Return the calculated target_date as a value
        self.update(target_date: target_date)
      end
    end
  end
  
  private 

  def target_date_cannot_be_in_the_past
    if target_date.present? && target_date < Date.today
      errors.add(:target_date, "can't be in the past")
    end
  end
end  