class Api::GamesController < ApplicationController
    before_action :require_logged_in

    def index
        @games = Game.all
        render :index
    end

    def create
        @game = Game.new(game_params)
        if @game.save!
            render :show
        else
            render json: @game.errors.full_messages, status: 422
        end
    end

    def show
        @game = Game.find_by(id: params[:id])
        render :show
    end

    private
    def game_params
        self.params.require(:game).permit(:title, :body, :user_id)
    end
end