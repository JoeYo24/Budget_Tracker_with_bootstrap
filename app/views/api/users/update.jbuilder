json.user do 
    json.id @user.id 
    json.email @user.email
    json.username @user.username
    json.salary_after_tax @user.salary_after_tax
end