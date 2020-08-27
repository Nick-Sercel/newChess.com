class Api::GamesController < ApplicationController
    before_action :require_logged_in

    def index
        @games = current_user.games_begun + current_user.games_joined
        render :index
    end

    def create
        @game = Game.new(game_params)
        if @game.save!  # needs removiing eventually
            render :show
        else
            render json: @game.errors.full_messages, status: 422
        end
    end

    def update
        @game = Game.find_by(id: params[:id])
        if @game
            @game.update(game_params)
            render :show
        else
            render :show
        end
    end

    def show
        @game = Game.find_by(id: params[:id])
        render :show
    end

    private
    def game_params
        self.params.require(:game).permit(:central_user_id, :foreign_user_id, :winner_id, :moves_list)
    end
end