class SavingsTransaction < ApplicationRecord
  belongs_to :user
  belongs_to :goal, optional: true 

  validates :amount, presence: true, numericality: { greater_than: 0 }
  validates :date, presence: true
end