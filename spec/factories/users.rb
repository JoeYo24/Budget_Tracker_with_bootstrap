FactoryBot.define do
  factory :user do
    sequence(:username) { |n| "user_#{n}" }
    password { 'password123' }
    sequence(:email) { |n| "user#{n}@example.com" }
    salary_after_tax { 50000 } # Set the initial salary value
  end
end
