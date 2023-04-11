class ChangeReviews < ActiveRecord::Migration[7.0]
  def change
    change_column :reviews, :rating, :float, null: true
  end
end
