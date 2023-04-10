require "open-uri"
ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all
  Listing.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('listings')

  puts "Creating users..."
  # Create one user with an easy to remember first_name, last_name, email and password:
  user1 = User.create!(
    first_name: 'Demo', 
    last_name: 'Demo', 
    email: 'demo@user.io', 
    password: 'password'
  )
  # # More users
  # 10.times do 
  #   User.create!({
  #     username: Faker::Internet.unique.username(specifier: 3),
  #     email: Faker::Internet.unique.email,
  #     password: 'password'
  #   }) 
  # end

  puts "Creating listings..."
  listing1 = Listing.create!(
    user_id:1, 
    title: "Condo in New York",
    description: "World-class luxury experience at an exclusive address. Perfectly situated in the middle of NYC, this stunning and generously spacious apartment with more than 1,200 sq. ft.(120m) offers every luxury and convenience to provide an exceptional living experience. Featuring floor to ceiling windows for stunning, unobstructed panoramic views of Manhattan’s skyline and beyond. Includes all digital & smart features, high speed Wi-Fi and in-unit washer/dryer.", 
    place_type: "entire_place", 
    feature: "luxe", 
    num_of_bath: 2, 
    num_of_bed: 4, 
    max_guests: 6, 
    city: "New York", 
    country: "USA", 
    latitude: 40.750748892677535, 
    longitude: -73.99574981258051, 
    price: 1200    
  )

  puts "Attaching images..."

  # l1i1 = URI.open("s3://airbbc-dev/listings/1/1.jpg")
  l1i1 = File.open("frontend/src/assets/listings/1/1.jpg")
  # l1i2 = File.open("frontend/src/assets/listings/1/2.jpg")
  # l1i3 = File.open("frontend/src/assets/listings/1/3.jpg")
  # l1i4 = File.open("frontend/src/assets/listings/1/4.jpg")
  # l1i5 = File.open("frontend/src/assets/listings/1/5.jpg")
  listing1.images.attach(
    [io: l1i1, filename:"1.jpg"]
    # [io: l1i2, filename:"2.jpg"],
    # [io: l1i3, filename:"3.jpg"],
    # [io: l1i4, filename:"4.jpg"],
    # [io: l1i5, filename:"5.jpg"],
  )

  listing2 = Listing.create!(
    user_id:1, 
    title: "1 BD Luxury apartment with stunning views",
    description: "Amazing apartment with stunning skyline views to manhattan. don't look further if you need a quick access  to to Hudson Yards, Time Square, Hell's Kitchen, Javits Center, the Summit Vanderbilt , Bryant Park, The Vessel and many more", 
    place_type: "entire_place", 
    feature: "amazing_pools", 
    num_of_bath: 2, 
    num_of_bed: 5, 
    max_guests: 5, 
    city: "New York", 
    country: "USA", 
    latitude: 40.751748892677535, 
    longitude: -73.99674981258051, 
    price: 1000    
  )

  listing3 = Listing.create!(
    user_id:1, 
    title: "Beautiful 1-bedroom - gorgeous view",
    description: "Beautiful, clean and stylish 1-bedroom apartment in Lincoln Center with a view to Hudson River, downtown Manhattan, and Broadway/Central Park. Modern building near many attractions! The apartment has a great layout, is spacious and everything is new. Come enjoy Manhattan in a peaceful area but steps away from major attractions.", 
    place_type: "entire_place", 
    feature: "trending", 
    num_of_bath: 2, 
    num_of_bed: 2, 
    max_guests: 4, 
    city: "New York", 
    country: "USA", 
    latitude: 40.750758892677535, 
    longitude: -73.99594981258051, 
    price: 600    
  )

  listing4 = Listing.create!(
    user_id:1, 
    title: "Condo in New York",
    description: "World-class luxury experience at an exclusive address. Perfectly situated in the middle of NYC, this stunning and generously spacious apartment with more than 1,200 sq. ft.(120m) offers every luxury and convenience to provide an exceptional living experience. Featuring floor to ceiling windows for stunning, unobstructed panoramic views of Manhattan’s skyline and beyond. Includes all digital & smart features, high speed Wi-Fi and in-unit washer/dryer.", 
    place_type: "entire_place", 
    feature: "bed_breakfast", 
    num_of_bath: 2, 
    num_of_bed: 4, 
    max_guests: 6, 
    city: "New York", 
    country: "USA", 
    latitude: 40.750748892677535, 
    longitude: -73.99574981258051, 
    price: 1200    
  )

  listing5 = Listing.create!(
    user_id:1, 
    title: "Condo in New York",
    description: "World-class luxury experience at an exclusive address. Perfectly situated in the middle of NYC, this stunning and generously spacious apartment with more than 1,200 sq. ft.(120m) offers every luxury and convenience to provide an exceptional living experience. Featuring floor to ceiling windows for stunning, unobstructed panoramic views of Manhattan’s skyline and beyond. Includes all digital & smart features, high speed Wi-Fi and in-unit washer/dryer.", 
    place_type: "entire_place", 
    feature: "new", 
    num_of_bath: 2, 
    num_of_bed: 4, 
    max_guests: 6, 
    city: "New York", 
    country: "USA", 
    latitude: 40.750748892677535, 
    longitude: -73.99574981258051, 
    price: 1200    
  )

  listing6 = Listing.create!(
    user_id:1, 
    title: "Condo in New York",
    description: "World-class luxury experience at an exclusive address. Perfectly situated in the middle of NYC, this stunning and generously spacious apartment with more than 1,200 sq. ft.(120m) offers every luxury and convenience to provide an exceptional living experience. Featuring floor to ceiling windows for stunning, unobstructed panoramic views of Manhattan’s skyline and beyond. Includes all digital & smart features, high speed Wi-Fi and in-unit washer/dryer.", 
    place_type: "entire_place", 
    feature: "creative_spaces", 
    num_of_bath: 2, 
    num_of_bed: 4, 
    max_guests: 6, 
    city: "New York", 
    country: "USA", 
    latitude: 40.750748892677535, 
    longitude: -73.99574981258051, 
    price: 1200    
  )
  # listing4 = Listing.create!(
  #   user_id:1, 
  #   title: "",
  #   description: "", 
  #   place_type: "", 
  #   feature: "", 
  #   num_of_bath: , 
  #   num_of_bed: , 
  #   max_guests: , 
  #   city: "New York", 
  #   country: "USA", 
  #   latitude: 40.750748892677535, 
  #   longitude: -73.99574981258051, 
  #   price: 1200    
  # )

  


  

  

  puts "Done!"
end