json.goal do 
    json.id @goal.id 
    json.description @goal.description 
    json.amount @goal.amount 
    json.target_date @goal.target_date 
end 