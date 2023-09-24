json.transactions do 
    @transactions.each do |transaction| 
        json.set! transaction.id do 
            json.id transaction.id 
            json.amount transaction.amount 
            json.date transaction.date 
            json.description transaction.description 
            json.transaction_type transaction.transaction_type 
        end
    end
end