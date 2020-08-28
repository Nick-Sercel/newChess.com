class Api::FriendsController < ApplicationController
    
    before_action :require_logged_in

    def index
        @friends = current_user.friends_requested + current_user.friends_received
        render :index
    end

    def create
        @friend = Friend.new()
        # loop do
            # @friend.id = SecureRandom.hex(10)
            # break unless Friend.where(id: @friend.id).exists?
        # end
        @friend.central_user_id = current_user.id
        @user = User.find_by(username: params[:friend])
        # debugger;
        @friend.foreign_user_id = @user.id
        @friend.accepted = false
        # debugger
        if @friend.save! # remove once I know this create is working for valid users
            render :show
        else
            render json: @friend.errors.full_messages, status: 422
        end
    end

    def update
        @friend = Friend.find_by(id: params[:id])
        if @friend && @friend.foreign_user_id == current_user.id
            @friend.update!(friend_params)
            render :show
        else
            render :show
        end
    end

    def show
        @friend = Friend.find_by(id: params[:id])
        render :show
    end

    def destroy
        @friend = Friend.find_by(id: params[:id])
        if @friend && @friend.central_user_id == current_user.id || @friend.foreign_user_id == current_user.id
            @friend.destroy
            render :show
        else
            render :show
        end
    end

    private
    def friend_params
        self.params.require(:friend).permit(:central_user_id, :foreign_user_id, :accepted)
    end
end