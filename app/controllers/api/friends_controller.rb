class Api::FriendsController < ApplicationController
    class Api::FriendsController < ApplicationController
    
    before_action :require_logged_in

    def index
        @friends = Friend.all
        render :index
    end

    def create
        @friend = Friend.new(friend_params)
        if @friend.save!
            render :show
        else
            render json: @friend.errors.full_messages, status: 422
        end
    end

    def show
        @friend = Friend.find_by(id: params[:id])
        render :show
    end

    def destroy
        @friend = Friend.find_by(id: params[:id])
        if @friend && @friend.user_id == current_user.id
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
end