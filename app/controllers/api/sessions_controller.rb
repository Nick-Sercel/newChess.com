class SessionsController < ApplicationController
    
    before_action :require_logged_in, only: [:destroy]

    def new
        render :show
    end

    def create
        @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
        if @user
            login!(@user)
            render: show # need to render the users/show not goals/show
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def destroy
        logout!
        render: show # need to render the users/show not goals/show
    end
end