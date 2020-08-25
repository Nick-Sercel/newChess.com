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

User.create!(id: 1, username: 'Demo User', email: 'dummyEmail@gmail.com', elo: 420, password: '123456')
User.create!(id: 2, username: 'Twilight Dave', email: 'allSkill@gmail.com', elo: 9001, password: 'procsOnlyFools')

Goal.create(id: 1, title: 'Learn the pieces', body: 'Figure out what each piece does and how to use them', user_id: 1)

Game.create(id: 1, central_user_id: 1, foreign_user_id: 2, winner_id: 2, moves_list: 'e4 e5 Qh5 Nc6 Bc4 Nf6 Qxf7')

Friend.create(id: 1, central_user_id: 1, foreign_user_id: 2, accepted: true)