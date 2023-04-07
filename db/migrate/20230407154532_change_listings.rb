class ChangeListings < ActiveRecord::Migration[7.0]
  def change
    add_column :listings, :title, :string, null: false
    #Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
