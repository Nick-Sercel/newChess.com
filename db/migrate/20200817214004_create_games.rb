class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.integer :central_user_id, null: false
      t.integer :foreign_user_id, null: false
      t.integer :winner_id
      t.string :moves_list, null: false

      t.timestamps
    end
    add_index :games, :central_user_id
    add_index :games, :foreign_user_id
  end
end