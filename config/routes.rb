Rails.application.routes.draw do
  root to: "static_pages#root"

  namespace :api, defaults: { format: :json } do
    resources :users, except: [:index, :edit, :new] # you whut m8
  end
end