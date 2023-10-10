class Transaction < ApplicationRecord
    belongs_to :user 
    belongs_to :goal, optional: true
  
    TRANSACTION_TYPES = %w(Income Need Want Savings).freeze 
  
    validates :user_id, presence: true 
    validates :amount, presence: true, numericality: { greater_than: 0 }
    validates :transaction_type, presence: true, inclusion: { in: TRANSACTION_TYPES } 
    validates :date, presence: true
    validates :description, presence: true, length: { maximum: 20 }
    validate :date_cannot_be_in_the_future
  
    private 
            
    def date_cannot_be_in_the_future
      if date.present? && date > Date.today
        errors.add(:date, "can't be in the future")
      end
    end
end