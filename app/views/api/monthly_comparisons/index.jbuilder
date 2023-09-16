json.monthly_comparisons @monthly_comparisons do |monthly_comparison|
    json.extract! monthly_comparison, :id, :month, :savings
end