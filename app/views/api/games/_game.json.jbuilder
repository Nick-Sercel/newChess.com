json.extract! game, :id, :central_user_id, :foreign_user_id, :winner_id, :moves_list
json.central_username game.primary_user.username
json.foreign_username game.foreign_user.username