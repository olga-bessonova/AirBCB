class CreateListing < ActiveRecord::Migration[7.0]
  def change
    create_table :listings do |t|
      t.references :users, null: false, foreign_key: true, index: true
      t.string :place_type, null: false
      t.string :feature, null: false

      t.integer :num_of_bath, null: false
      t.integer :num_of_bed, null: false
      t.integer :max_guests, null: false

      t.string :city, null: false, index: true
      t.string :country, null: false, index: true
      t.float :latitude, null: false
      t.float :longitude, null: false

      t.float :price, null: false
      t.text :description, null: false
      
      t.timestamps
    end
  end
end
