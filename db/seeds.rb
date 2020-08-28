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

user1 = User.create!(username: 'Demo User', email: 'dummyEmail@gmail.com', elo: 420, password: '123456')
user2 = User.create!(username: 'Twilight Dave', email: 'allSkill@gmail.com', elo: 9001, password: 'procsOnlyFools')
computer = User.create!(username: 'Dave the computer', email: 'dddddave@mechanicalGod.com', password: 'lmaoxd')

Goal.create(title: 'Learn the pieces', body: 'Figure out what each piece does and how to use them', user_id: user1.id)

Game.create(central_user_id: user1.id, foreign_user_id: user2.id, winner_id: user2.id, moves_list: 'e4 e5 Qh5 Nc6 Bc4 Nf6 Qxf7')

Friend.create(central_user_id: user1.id, foreign_user_id: user2.id, accepted: true)