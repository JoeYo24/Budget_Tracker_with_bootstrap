json.transactions do 
    json.array! @transactions do |transaction| 
        json.id transaction.id 
        json.amount transaction.amount 
        json.date transaction.date 
        json.description transaction.description 
    end 
end