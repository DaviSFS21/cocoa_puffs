Rails.application.routes.draw do
  namespace :api do
    resources :cocoa_puffs, only: [ :index, :create, :update ] do
      resources :fruity_pebbles, only: [ :show, :create ]
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
