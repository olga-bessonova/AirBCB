class UpdateReviews < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :reviews, :users, column: :user_id
    add_foreign_key :reviews, :listings, column: :listing_id
  end
end
