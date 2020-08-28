# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Goal.destroy_all
Game.destroy_all
Friend.destroy_all

computer = User.create(id: 1, username: 'Dave the computer', email: 'dddddave@mechanicalGod.com', elo: 200, password: 'lmaoxd')
user1 = User.create!(username: 'Demo User', email: 'dummyEmail@gmail.com', elo: 420, password: '123456')
user2 = User.create!(username: 'Twilight Dave', email: 'allSkill@gmail.com', elo: 9001, password: 'procsOnlyFools')

Goal.create(title: 'Learn the pieces', body: 'Figure out what each piece does and how to use them', user_id: user1.id)
Goal.create(title: 'Openings', body: 'Find a good opening to use as black against knights', user_id: user1.id)

Game.create(central_user_id: user1.id, foreign_user_id: user2.id, winner_id: user2.id, moves_list: 'e4 e5 Qh5 Nc6 Bc4 Nf6 Qxf7')
Game.create(central_user_id: user1.id, foreign_user_id: computer.id, winner_id: user1.id, moves_list: 'd3, c6, c4, b5, Qa5')

Friend.create(central_user_id: user1.id, foreign_user_id: user2.id, accepted: true)
Friend.create(central_user_id: computer.id, foreign_user_id: user1.id, accepted: false);