@goals.each do |goal|
  json.set! goal.id do
    json.partial! 'goal', goal: goal
  end
end
