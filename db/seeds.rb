ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."
  # Create one user with an easy to remember first_name, last_name, email and password:
  User.create!(
    first_name: 'Demo', 
    last_name: 'Demo', 
    email: 'demo@user.io', 
    password: 'password'
  )

  Listing.destroy_all
  ApplicationRecord.connection.reset_pk_sequence!('listings')
  Listing.create!(user_id:1, place_type: "entire_place", feature: "luxe", num_of_bath: 1, num_of_bed: 1, max_guests: 2, city: "New York", 
    country: "USA", latitude: 70, longitude: 70, price: 100, description: "cool spot", title: "Apartment")

  # # More users
  # 10.times do 
  #   User.create!({
  #     username: Faker::Internet.unique.username(specifier: 3),
  #     email: Faker::Internet.unique.email,
  #     password: 'password'
  #   }) 
  # end

  puts "Done!"
end