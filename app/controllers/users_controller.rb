class UsersController < ApplicationController
    
    before_action :require_logged_in, only: [:show, :index]

    def new
        @user = User.new
        render :new
    end

    def create
        @user = User.create(user_params)
        if @user.save
            login!(@user)
            redirect_to users_url
        else
           flash[:errors] = @user.errors.full_messages
           render :new 
        end
    end

    def show
        @user = User.find_by(id: params[:id])
        render :show
    end

    def index
        @users = User.all
        render :index
    end

    private
    def user_params
        self.params.require(:user).permit(:username, :email, :password)
    end
end