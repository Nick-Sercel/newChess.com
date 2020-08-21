# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

User.create!(id: 1, username: 'Demo User', email: 'dummyEmail@gmail.com', elo: 420, password: '123456')
User.create!(id: 2, username: 'Twilight Dave', email: 'allSkill@gmail.com', elo: 9001, password: 'procsOnlyFools')