class User < ApplicationRecord
    has_secure_password 

    has_many :transactions, dependent: :destroy
    has_many :goals, dependent: :destroy 
    has_many :monthly_comparisons, dependent: :destroy
    has_many :sessions 

    validates :username, presence: true, uniqueness: true, on: :create 
    validates :password, presence: true, length: { minimum: 8 }, on: :create
    validates :email, presence: true, uniqueness: true, on: :create
    validates :salary_after_tax, presence: true, numericality: { greater_than: 0}

    validates_uniqueness_of :username 
    validates_uniqueness_of :email
    
    def self.authenticate(email, password) 
        user = find_by(email: email)
        if user && user.authenticate(password) 
            user 
        else 
            nil 
        end
    end
end

