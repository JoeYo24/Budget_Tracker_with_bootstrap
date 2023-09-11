Rails.application.routes.draw do
  root 'static_pages#home'
  get '/login' => 'static_pages#login'
  get '/signup' => 'static_pages#signup'
  get '/my-diary' => 'static_pages#mydiary'
  get '/profile' => 'static_pages#profile'
  get '/compare' => 'static_pages#compare'
  get '/goals' => 'static_pages#goals'
  get '/my-diary/transaction' => 'static_pages#add_transaction'
  get '/goals/add' => 'static_pages#add_goal'
  
  get '*path' => redirect('/')
end
