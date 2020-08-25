Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: { format: :json } do
    resources :users, except: [:index, :edit, :new] # you whut m8
    resource :session, only: [:create, :destroy]
    resources :goals, except: [:edit, :new]
    resources :games, except: [:edit, :new, :update, :destroy]
  end
end