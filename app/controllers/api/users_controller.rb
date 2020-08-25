class Api::UsersController < ApplicationController
    
    # before_action :require_logged_in, only: [:show, :index]

    # def new
    #     @user = User.new
    #     render :show
    #     # this prob needs to change from show --
    #     # also make new corresponding file in views/api/users
    # end

    def create
        @user = User.create(user_params)
        if @user.save
            login!(@user)
            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def update
        @user = User.find_by(id: params[:id])
        if @user && @user.id == current_user.id && @user.update(user_params)
            render :show
        else
            render :show # return to login page or something
        end
    end

    def show
        @user = User.find_by(id: params[:id])
        render :show
    end

    private
    def user_params
        self.params.require(:user).permit(:username, :email, :elo, :password)
    end
end