json.goals do 
    @goals.each do |goal| 
        json.set! goal.id do 
            json.id goal.id 
            json.description goal.description
            json.amount goal.amount
            json.progress goal.progress
            json.target_date goal.target_date
        end 
    end 
end