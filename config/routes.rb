Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: { format: :json } do
    resources :users, except: [:index, :edit, :new]
    resource :session, only: [:create, :destroy]
    resources :goals, except: [:edit, :new]
    resources :games, except: [:edit, :new, :update, :destroy]
    resource :friends, except: [:edit, :new, :update]
  end
end