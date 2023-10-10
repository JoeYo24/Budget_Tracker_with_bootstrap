json.savings_transaction do 
    json.id @savings_transaction.id
    json.date @savings_transaction.date
    json.amount @savings_transaction.amount
    json.description @savings_transaction.description
    json.goal_id @savings_transaction.goal_id
    json.applied @savings_transaction.applied
end