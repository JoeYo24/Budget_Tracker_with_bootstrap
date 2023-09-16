class Session < ApplicationRecord
    belongs_to :user 

    validates :user_id, presence: true 
    validates :token, presence: true, uniqueness: true
end
