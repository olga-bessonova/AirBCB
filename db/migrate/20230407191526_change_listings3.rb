class ChangeListings3 < ActiveRecord::Migration[7.0]
  def change
    rename_column :listings, :users_id, :user_id
    #Ex:- rename_column("admin_users", "pasword","hashed_pasword")
  end
end
