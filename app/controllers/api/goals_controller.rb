class Api::GoalsController < ApplicationController
    
    before_action :require_logged_in

    def index
        @goals = Goal.all
        render :index
    end

    def create
        @goal = Goal.new(goal_params)
        if @goal.save!
            render :show
        else
            render json: @goal.errors.full_messages, status: 422
        end
    end

    def update
        @goal = Goal.find_by(id: params[id])
        if @goal && @goal.user_id == current_user.id
            @goal.update
            render :show
        else
            render :show
        end
    end

    def destroy
        @goal = Goal.find_by(id: params[:id])
        if @goal && @goal.user_id == current_user.id
            @goal.destroy
            render :show
        else
            render :show
        end
    end

    private
    def goal_params
        self.params.require(:goal).permit(:title, :body, :user_id)
    end
end