require 'rails_helper'

RSpec.describe User, type: :model do
  it 'creates, updates, and deletes a user' do
    # Create a user
    user = FactoryBot.create(:user)

    # Update the salary_after_tax attribute
    new_salary = 60000
    user.update(salary_after_tax: new_salary)

    # Ensure the user's salary_after_tax has been updated
    expect(user.salary_after_tax).to eq(new_salary)

    # Delete the user
    user.destroy

    # Ensure the user has been deleted
    expect(User.exists?(user.id)).to be_falsey
  end
end

