class User < ApplicationRecord
    has_secure_password 

    has_many :transactions, dependent: :destroy
    has_many :goals, dependent: :destroy 
    has_many :monthly_comparisons, dependent: :destroy
    has_many :sessions 

    validates :username, presence: true, uniqueness: true
    validates :password, presence: true, length: { minimum: 8 }
    validates :email, presence: true, uniqueness: true
    validates :salary_after_tax, presence: true, numericality: { greater_than: 0}

    validates_uniqueness_of :username 
    validates_uniqueness_of :email

    after_validation :hash_password

    def self.authenticate(password) 
        if BCrypt::Password.new(self.password_digest) === password 
            return self 
        else 
            return false 
        end 
    end

    private 

    def hash_password 
        self.password = BCrypt::Password.create(password)
    end
end

