class CreateFriends < ActiveRecord::Migration[5.2]
  def change
    create_table :friends do |t|
      t.integer :central_user_id, null: false
      t.integer :foreign_user_id, null: false
      t.boolean :accepted, null: false

      t.timestamps
    end
    add_index :friends, :central_user_id
    add_index :friends, :foreign_user_id
  end
end