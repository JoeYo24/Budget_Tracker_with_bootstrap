class Transaction < ApplicationRecord
    belongs_to :user 
  
    TRANSACTION_TYPES = %w(Income Need Want Savings).freeze 
  
    validates :user_id, presence: true 
    validates :amount, presence: true, numericality: { greater_than: 0 }
    validates :transaction_type, presence: true, inclusion: { in: TRANSACTION_TYPES } 
    validates :date, presence: true
    validates :description, presence: true, length: { maximum: 20 }
    validate :date_cannot_be_in_the_future
  
    after_create :update_goals
  
    private 
  
    def update_goals
      user = self.user
      remaining_savings = self.amount
    
      while remaining_savings.positive?
        goal = user.goals.first
    
        break unless goal || self.transaction_type == "Savings"
    
        if goal
          savings_to_apply = [remaining_savings, goal.amount].min
          progress_to_apply = [(savings_to_apply / goal.amount.to_f * 100), 100].min
    
          puts 'Progress to Apply: ' + progress_to_apply.to_s + '%'
          puts 'Goal: ' + goal.amount.to_s
          puts 'Remaining Savings: ' + remaining_savings.to_s
    
          # Add progress_to_apply to the current progress
          new_progress = goal.progress + progress_to_apply
    
          puts 'New Goal Progress: ' + new_progress.to_s + '%'
    
          # Update the goal's progress
          goal.update(progress: new_progress)
    
          if new_progress >= 100
            remaining_savings -= savings_to_apply
            goal.destroy
          else
            break
          end
        else
          break
        end
      end
    end
            
    def date_cannot_be_in_the_future
      if date.present? && date > Date.today
        errors.add(:date, "can't be in the future")
      end
    end
  end
  