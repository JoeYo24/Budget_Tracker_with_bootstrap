class Goal < ApplicationRecord
    belongs_to :user 

    validates :user_id, presence: true 
    validates :amount, presence: true, numericality: { greater_than: 0 }
    validates :description, presence: true, length: { maximum: 20 }
    validates :target_date, presence: true

    private 

    def target_date_cannot_be_in_the_past
        if target_date.present? && target_date < Date.today
            errors.add(:target_date, "can't be in the past")
        end
    end

    def calculate_progress 
        total_savings = Transaction.where(user_id: self.user_id, transaction_type: "savings").sum(:amount)
        self.progress = (total_savings / self.amount) * 100
        save 
    end
end
