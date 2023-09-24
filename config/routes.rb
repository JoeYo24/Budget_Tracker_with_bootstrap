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

  namespace :api do
    resources :users, only: [:create, :update, :destroy]
    resources :sessions, only: [:create] do  
      collection do 
        get 'authenticated'
      end
    end
    resources :transactions, only: [:create, :index, :destroy] do
      collection do 
        get 'show_by_date'
      end
    end
    resources :goals, only: [:create, :index, :destroy] 
    resources :monthly_comparisons, only: [:index] do 
      member do 
        post 'calculate_and_update_savings_by_month'
      end
    end

    delete '/sessions/:token' => 'sessions#destroy'
  end 
  
  get '*path' => redirect('/')
end
