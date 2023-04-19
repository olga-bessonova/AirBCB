require "open-uri"
# ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all
  Listing.destroy_all
  Review.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('listings')
  ApplicationRecord.connection.reset_pk_sequence!('reviews')

  # puts "Creating users..."
  # Create one user with an easy to remember first_name, last_name, email and password:
  user1 = User.create!(
    first_name: 'Demo', 
    last_name: 'Demo', 
    email: 'demo@user.io', 
    password: 'password'
  )

  user2 = User.create!(
    first_name: 'Mary', 
    last_name: 'Primavera', 
    email: 'mary@user.io', 
    password: 'password'
  )

  user3 = User.create!(
    first_name: 'Boris', 
    last_name: 'Gentle', 
    email: 'boris@user.io', 
    password: 'password'
  )

  user4 = User.create!(
    first_name: 'Rex', 
    last_name: 'Brave', 
    email: 'rex@user.io', 
    password: 'password'
  )

  user5 = User.create!(
    first_name: 'Zhdun', 
    last_name: 'Long', 
    email: 'zhdun@user.io', 
    password: 'password'
  )

  puts "Attaching photo to users..."

  # user1_photo = File.open("frontend/src/assets/avatar/user1.jpg")
  user1_photo = URI.open("https://airbbc-dev.s3.amazonaws.com/avatar/user1.jpg")  
  user1.photo.attach(io: user1_photo, filename:"user1.jpg")

  # user2_photo = File.open("frontend/src/assets/avatar/user2.jpg")
  user2_photo = URI.open("https://airbbc-dev.s3.amazonaws.com/avatar/user2.jpg")  
  user2.photo.attach(io: user2_photo, filename:"user2.jpg")

  user3_photo = URI.open("https://airbbc-dev.s3.amazonaws.com/avatar/user3.jpg")
  user3.photo.attach(io: user3_photo, filename:"user3.jpg")

  user4_photo = URI.open("https://airbbc-dev.s3.amazonaws.com/avatar/user4.jpg")
  user4.photo.attach(io: user4_photo, filename:"user4.jpg")

  user5_photo = URI.open("https://airbbc-dev.s3.amazonaws.com/avatar/user5.jpg")
  user5.photo.attach(io: user5_photo, filename:"user5.jpg")



  # )
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
    user_id:2, 
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
    longitude: -73.9957498125805, 
    price: 1200    
  )

  listing2 = Listing.create!(
    user_id: 2, 
    title: "Luxury apartment with stunning views",
    description: "Amazing apartment with stunning skyline views to manhattan. don't look further if you need a quick access  to to Hudson Yards, Time Square, Hell's Kitchen, Javits Center, the Summit Vanderbilt , Bryant Park, The Vessel and many more", 
    place_type: "entire_place", 
    feature: "amazing_pools", 
    num_of_bath: 2, 
    num_of_bed: 5, 
    max_guests: 5, 
    city: "New York", 
    country: "USA", 
    latitude: 40.750748892677535-0.01, 
    longitude: -73.9957498125805-0.01,  
    price: 1000    
  )

  listing3 = Listing.create!(
    user_id: 3, 
    title: "Beautiful Apartment",
    description: "Beautiful, clean and stylish 1-bedroom apartment in Lincoln Center with a view to Hudson River, downtown Manhattan, and Broadway/Central Park. Modern building near many attractions! The apartment has a great layout, is spacious and everything is new. Come enjoy Manhattan in a peaceful area but steps away from major attractions.", 
    place_type: "entire_place", 
    feature: "trending", 
    num_of_bath: 2, 
    num_of_bed: 2, 
    max_guests: 4, 
    city: "New York", 
    country: "USA", 
    latitude: 40.750748892677535-0.02, 
    longitude: -73.9957498125805+0.01, 
    price: 200    
  )

  listing4 = Listing.create!(
    user_id: 3, 
    title: "Luxury 3-bed duplex",
    description: "Luxury place very centrally located at Astoria New York. Tons of restaurants and cafes. It’s consist of 2nd and 3rd level of the townhouse. Guests has full private space to themselves. A lot of natural light from all the window plus the skylight. New construction eliminates any noice.  Private patio is perfect for getting together to chat and relax. Walking distance to laundromat.  1 block to N&W trains bring you to Manhattan in 15 mins.", 
    place_type: "entire_place", 
    feature: "bed_breakfast", 
    num_of_bath: 2, 
    num_of_bed: 3, 
    max_guests: 6, 
    city: "New York", 
    country: "USA", 
    latitude: 40.750748892677535-0.015, 
    longitude: -73.9957498125805-0.007, 
    price: 300    
  )

  listing5 = Listing.create!(
    user_id: 4, 
    title: "Smart Home",
    description: "Experience luxury living in our duplex loft, featuring 2 private outdoor areas, keyless entry, and a 5-min walk to trains. Our modern abode boasts 3 beds, a sofa bed, 2 bedrooms, 1.5 spa-inspired baths, fully-equipped kitchen, and a 4K Smart TV living room. High-speed WiFi and memory foam mattress ensure a comfortable stay, while central A/C and heating, keyless locks and Bluetooth bathroom speaker add to the experience.", 
    place_type: "entire_place", 
    feature: "new", 
    num_of_bath: 3, 
    num_of_bed: 4, 
    max_guests: 6, 
    city: "New York", 
    country: "USA", 
    latitude: 40.750748892677535+0.018, 
    longitude: -73.9957498125805+0.01,
    price: 400    
  )

  listing6 = Listing.create!(
    user_id: 4, 
    title: "Modern Duplex",
    description: "The apartment is in a historic Brooklyn brownstone. As soon as you walk up the stoop and enter the door, you are welcomed by high ceilings and floor to ceiling windows bringing in gorgeous sunlight.", 
    place_type: "entire_place", 
    feature: "creative_spaces", 
    num_of_bath: 1, 
    num_of_bed: 2, 
    max_guests: 4, 
    city: "New York", 
    country: "USA", 
    latitude: 40.750748892677535+0.012, 
    longitude: -73.9957498125805-0.004, 
    price: 1200    
  )
  # listing4 = Listing.create!(
  #   user_id: 2, 
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

  l1i1 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/1/1.jpg")
  l1i2 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/1/2.jpg")
  l1i3 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/1/3.jpg")
  l1i4 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/1/4.jpg")
  l1i5 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/1/5.jpg")
  # l1i1 = File.open("frontend/src/assets/listings/1/1.jpg")
  # l1i2 = File.open("frontend/src/assets/listings/1/2.jpg")
  # l1i3 = File.open("frontend/src/assets/listings/1/3.jpg")
  # l1i4 = File.open("frontend/src/assets/listings/1/4.jpg")
  # l1i5 = File.open("frontend/src/assets/listings/1/5.jpg")
  listing1.photos.attach(
    [io: l1i1, filename:"1.jpg"],
    [io: l1i2, filename:"2.jpg"],
    [io: l1i3, filename:"3.jpg"],
    [io: l1i4, filename:"4.jpg"],
    [io: l1i5, filename:"5.jpg"]
  )

  l2i1 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/2/1.jpg")
  l2i2 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/2/2.jpg")
  l2i3 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/2/3.jpg")
  l2i4 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/2/4.jpg")
  l2i5 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/2/5.jpg")
  # l2i1 = File.open("frontend/src/assets/listings/2/1.jpg")
  # l2i2 = File.open("frontend/src/assets/listings/2/2.jpg")
  # l2i3 = File.open("frontend/src/assets/listings/2/3.jpg")
  # l2i4 = File.open("frontend/src/assets/listings/2/4.jpg")
  # l2i5 = File.open("frontend/src/assets/listings/2/5.jpg")
  listing2.photos.attach(
    [io: l2i1, filename:"1.jpg"],
    [io: l2i2, filename:"2.jpg"],
    [io: l2i3, filename:"3.jpg"],
    [io: l2i4, filename:"4.jpg"],
    [io: l2i5, filename:"5.jpg"]
  )

  l3i1 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/3/1.jpg")
  l3i2 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/3/2.jpg")
  l3i3 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/3/3.jpg")
  l3i4 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/3/4.jpg")
  l3i5 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/3/5.jpg")

  listing3.photos.attach(
    [io: l3i1, filename:"1.jpg"],
    [io: l3i2, filename:"2.jpg"],
    [io: l3i3, filename:"3.jpg"],
    [io: l3i4, filename:"4.jpg"],
    [io: l3i5, filename:"5.jpg"]
  )

  l4i1 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/4/1.jpg")
  l4i2 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/4/2.jpg")
  l4i3 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/4/3.jpg")
  l4i4 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/4/4.jpg")
  l4i5 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/4/5.jpg")

  listing4.photos.attach(
    [io: l4i1, filename:"1.jpg"],
    [io: l4i2, filename:"2.jpg"],
    [io: l4i3, filename:"3.jpg"],
    [io: l4i4, filename:"4.jpg"],
    [io: l4i5, filename:"5.jpg"]
  )

  l5i1 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/5/1.jpg")
  l5i2 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/5/2.jpg")
  l5i3 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/5/3.jpg")
  l5i4 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/5/4.jpg")
  l5i5 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/5/5.jpg")

  listing5.photos.attach(
    [io: l5i1, filename:"1.jpg"],
    [io: l5i2, filename:"2.jpg"],
    [io: l5i3, filename:"3.jpg"],
    [io: l5i4, filename:"4.jpg"],
    [io: l5i5, filename:"5.jpg"]
  )

  l6i1 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/6/1.jpg")
  l6i2 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/6/2.jpg")
  l6i3 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/6/3.jpg")
  l6i4 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/6/4.jpg")
  l6i5 = URI.open("https://airbbc-dev.s3.amazonaws.com/listings/6/5.jpg")

  listing6.photos.attach(
    [io: l6i1, filename:"1.jpg"],
    [io: l6i2, filename:"2.jpg"],
    [io: l6i3, filename:"3.jpg"],
    [io: l6i4, filename:"4.jpg"],
    [io: l6i5, filename:"5.jpg"]
  )

  puts "Creating reviews..."

  r1 = Review.create!(
    user_id: 3, 
    listing_id: 1,
    body: "This apartment on Airbnb was fantastic! It was clean, spacious, and had everything we needed. The location was great, with plenty of restaurants and shops within walking distance. The host was also very responsive and helpful. Highly recommend!", 
    cleanliness: 5, 
    communication: 5, 
    checkin: 5, 
    accuracy: 5, 
    location: 5, 
    value: 5,
    rating: 5   
  )

  r2 = Review.create!(
    user_id: 4, 
    listing_id: 1,
    body: "I had a terrible experience at this Airbnb apartment. The space was dirty and poorly maintained, with broken furniture and a musty odor. The host was unresponsive and unhelpful, making the stay even more frustrating. I would not recommend this apartment to anyone.", 
    cleanliness: 1, 
    communication: 2, 
    checkin: 4, 
    accuracy: 3, 
    location: 2, 
    value: 1,
    rating: 2.17  
  )

  r3 = Review.create!(
    user_id: 5, 
    listing_id: 1,
    body: "This Airbnb apartment exceeded my expectations! The space was clean, cozy, and well-decorated. The host was also very accommodating and easy to communicate with. I highly recommend this apartment for anyone looking for a comfortable and convenient stay.", 
    cleanliness: 4, 
    communication: 5, 
    checkin: 3, 
    accuracy: 5, 
    location: 3, 
    value: 5,
    rating:  4.17  
  )

  r4 = Review.create!(
    user_id: 4, 
    listing_id: 2,
    body: "I had a wonderful stay at this Airbnb apartment! It was stylish, comfortable, and had all the amenities I needed. The location was perfect, with easy access to public transportation and great restaurants. The host was also very friendly and accommodating. Would definitely stay here again!", 
    cleanliness: 4, 
    communication: 5, 
    checkin: 5, 
    accuracy: 5, 
    location: 5, 
    value: 5,
    rating: 4.83   
  )

  r5 = Review.create!(
    user_id: 5, 
    listing_id: 2,
    body: "I regret booking this Airbnb apartment. The photos were misleading - the space was much smaller and darker than depicted. The bed was uncomfortable and the linens were not clean. The noise from the street kept me up all night. The host was difficult to reach and did not provide any helpful information about the area. Overall, a disappointing and unpleasant stay.",
    cleanliness: 4, 
    communication: 5, 
    checkin: 5, 
    accuracy: 5, 
    location: 5, 
    value: 5,
    rating: 4.83   
  )

  r6 = Review.create!(
    user_id: 2, 
    listing_id: 3,
    body: "This Airbnb apartment was amazing! The space was immaculate and beautifully designed, with all the amenities I needed for a comfortable stay. The location was also perfect, with easy access to public transportation and great restaurants. The host was friendly, responsive, and went above and beyond to make my stay memorable. I would highly recommend this apartment to anyone visiting the area!", 
    cleanliness: 4, 
    communication: 4, 
    checkin: 4, 
    accuracy: 5, 
    location: 5, 
    value: 5,
    rating: 4.5   
  )

  r7 = Review.create!(
    user_id: 4, 
    listing_id: 3,
    body: "This Airbnb apartment was perfect for my stay! It was clean, cozy, and had everything I needed. The location was also great, with plenty of shops and restaurants nearby. The host was friendly and easy to communicate with. Highly recommend!", 
    cleanliness: 4, 
    communication: 5, 
    checkin: 5, 
    accuracy: 3, 
    location: 4, 
    value: 5,
    rating: 4.33   
  )

  r8 = Review.create!(
    user_id: 5, 
    listing_id: 3,
    body: "I had a terrible experience at this Airbnb apartment. It was dirty, poorly maintained, and had several broken appliances. The location was also noisy and unsafe. The host was unresponsive and unhelpful. Would not recommend staying here.", 
    cleanliness: 2, 
    communication: 3, 
    checkin: 4,
    accuracy: 2, 
    location: 2, 
    value: 2,
    rating: 2.5  
  )

  r9 = Review.create!(
    user_id: 2, 
    listing_id: 4,
    body: "The space was cramped and in need of some repairs. The location was noisy and not very central. The host was friendly but not very responsive. Overall, I wouldn't recommend this apartment unless you're on a tight budget and don't mind sacrificing comfort for affordability.", 
    cleanliness: 2, 
    communication: 3, 
    checkin: 4,
    accuracy: 2, 
    location: 2, 
    value: 1,
    rating: 2.33   
  )

  r10 = Review.create!(
    user_id: 4, 
    listing_id: 4,
    body: "The space was clean and comfortable, but lacked some amenities I expected. The location was convenient, but not particularly scenic. The host was polite and helpful, but not overly communicative. Overall, a decent stay for the price.", 
    cleanliness: 5, 
    communication: 3, 
    checkin: 4,
    accuracy: 4, 
    location: 5, 
    value: 5,
    rating: 4.33   
  )

  r11 = Review.create!(
    user_id: 5, 
    listing_id: 4,
    body: "I had a fantastic stay at this apartment! The space was modern, clean, and well-equipped with everything I needed, including a designated parking spot for my car. The location was also convenient, with easy access to major highways and attractions. The host was friendly and responsive, making the entire experience seamless. I would definitely recommend this apartment to anyone looking for a comfortable and convenient stay with their car.", 
    cleanliness: 5, 
    communication: 5, 
    checkin: 5,
    accuracy: 5, 
    location: 5, 
    value: 5,
    rating: 5   
  )

  r12 = Review.create!(
    user_id: 2, 
    listing_id: 5,
    body: " The space was cozy, clean, and had everything I needed, including a parking spot for my car. The location was also great, with plenty of restaurants and shops within walking distance. The host was friendly and communicative, making the check-in process easy. I would highly recommend this apartment to anyone looking for a comfortable and convenient stay, especially if you're traveling with a car.", 
    cleanliness: 4, 
    communication: 4, 
    checkin: 4,
    accuracy: 4, 
    location: 4, 
    value: 4,
    rating: 4   
  )

  r13 = Review.create!(
    user_id: 3, 
    listing_id: 5,
    body: "My experience at this Airbnb apartment was terrible. The space was dirty and poorly maintained, with no designated parking spot for my car as advertised. The location was also unsafe and inconvenient. The host was unresponsive and unhelpful, making the situation even more frustrating. I would not recommend this apartment to anyone, especially if you're traveling with a car.", 
    cleanliness: 2, 
    communication: 1, 
    checkin: 4,
    accuracy: 2, 
    location: 5, 
    value: 2,
    rating: 2.67   
  )

  r14 = Review.create!(
    user_id: 5, 
    listing_id: 5,
    body: "This Airbnb apartment was beyond amazing! The space was stylish, clean, and had a designated parking spot for my car, which made my trip stress-free. The location was perfect, with plenty of attractions and amenities nearby. The host was extremely friendly and accommodating, making me feel at home. I would highly recommend this apartment to anyone looking for a luxurious and convenient stay with their car.", 
    cleanliness: 5, 
    communication: 3, 
    checkin: 5,
    accuracy: 4, 
    location: 5, 
    value: 5,
    rating: 4.5    
  )

  r15 = Review.create!(
    user_id: 2, 
    listing_id: 6,
    body: "I had a great stay at this Airbnb apartment! The space was comfortable, clean, and had a designated parking spot for my car, which was a huge plus. The location was also convenient, with plenty of restaurants and shops nearby. The host was friendly and responsive, making the entire experience seamless. I would definitely recommend this apartment to anyone looking for a comfortable and convenient stay, especially if you're traveling with a car.", 
    cleanliness: 4, 
    communication: 5, 
    checkin: 4,
    accuracy: 4, 
    location: 5, 
    value: 4,
    rating: 4.33   
  )

  r16 = Review.create!(
    user_id: 3, 
    listing_id: 6,
    body: "My experience at this Airbnb apartment was disappointing. The space was dirty and poorly maintained, with no designated parking spot for my car as promised. The location was also far from attractions and inconvenient. The host was unresponsive and unhelpful, making the situation worse.", 
    cleanliness: 2, 
    communication: 3, 
    checkin: 2,
    accuracy: 3, 
    location: 2, 
    value: 3,
    rating: 2.67   
  )

  r17 = Review.create!(
    user_id: 5, 
    listing_id: 6,
    body: "It was conveniently loacted in the center of New York city. Me and my husband liked every second of our stay. The car was absolutely amazing. I would recommend this apartment. I definetly will be coming back", 
    cleanliness: 5, 
    communication: 5, 
    checkin: 5,
    accuracy: 4, 
    location: 5, 
    value: 4,
    rating: 4.67    
  )

   

  

  puts "Done!"
# end