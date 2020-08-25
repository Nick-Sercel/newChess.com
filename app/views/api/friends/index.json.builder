@friends.each do |friend|
  json.set! friend.id do
    json.partial! 'friend', friend: friend
  end
end
