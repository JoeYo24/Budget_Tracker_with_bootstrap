class MonthlyComparison < ApplicationRecord
  belongs_to :user 

  validates :user_id, presence: true
  validates :month, presence: true, uniqueness: { scope: :user_id }
  validates :savings, presence: true, numericality: { greater_than_or_equal_to: 0 }
end

