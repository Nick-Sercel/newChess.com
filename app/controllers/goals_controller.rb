class GoalsController < ApplicationController
    
    before_action :require_logged_in

    def create
        @goal = Goal.new(goal_params)
        @goal.user_id = params[:user_id]
        if @goal.save
            redirect_to user_url(params[:user_id])
        else
            flash[:errors] = ["Details can't be blank"]
            redirect_to user_url(params[:user_id])
        end
    end

    def update
        @goal = Goal.find_by(id: params[id])
        if @goal && @goal.user_id == current_user.id
            @goal.update
            redirect_to users_url
        else
            redirect_to new_session_url
        end
    end

    def destroy
        @goal = Goal.find_by(id: params[:id])
        if @goal && @goal.user_id == current_user.id
            @goal.destroy
            redirect_to users_url
        else
            redirect_to new_session_url
        end
    end

    private
    def goal_params
        self.params.require(:goal).permit(:body, :title)
    end
end