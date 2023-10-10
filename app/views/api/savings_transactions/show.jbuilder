json.savings_transactions @savings_transactions do |savings_transaction|
    json.id savings_transaction.id
    json.amount savings_transaction.amount
    json.date savings_transaction.date
    json.description savings_transaction.description
    json.goal_id savings_transaction.goal_id
  end
  