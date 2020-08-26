json.extract! friend, :id, :central_user_id, :foreign_user_id, :accepted
json.central_username friend.primary_user.username
json.foreign_username friend.foreign_user.username