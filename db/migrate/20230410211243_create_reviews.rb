class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.bigint "user_id", null: false
      t.bigint "listing_id", null: false
      t.text "body", null: false
      t.integer "cleanliness", null: false
      t.integer "communication", null: false
      t.integer "checkin", null: false
      t.integer "accuracy", null: false
      t.integer "location", null: false
      t.integer "value", null: false
      t.float "rating", null: false
      
      t.timestamps
    end
  end
end
