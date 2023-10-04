namespace  :cleanup do 
    desc 'Cleanup old monthly comparisons records'
    task :monthly_comparisons => :environment do 
        retention_years = 1 
        oldest_allowed_year = Time.now.year - retention_years

        MonthlyComparison.where('extract(year from month) < ?', oldest_allowed_year).destroy_all

        puts "Monthly Comparisons Cleanup Completed" 
    end 
end

