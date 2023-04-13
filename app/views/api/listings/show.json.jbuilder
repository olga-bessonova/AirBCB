json.listing do
  json.partial! 'api/listings/listing', 
  listing: @listing
  # json.photos_url ['https://airbbc-dev.s3.amazonaws.com/cnrjp8vlhaneft38oj4ekz1syuca']

  if @listing.photos.attached?
    json.photos_url @listing.photos.map{|photo| photo.url}
        # json.set! photo.id do
        #   photo.url
        # end
      # end
  else
    json.photos_url ['https://airbbc-dev.s3.amazonaws.com/cnrjp8vlhaneft38oj4ekz1syuca']
  end
end

# json.user do
#   json.extract! @user,
#     :id,
#     :email,
#     :first_name,
#     :last_name,
#     :created_at,
#     :updated_at
# end

json.users do
  @users.each do |user|
    json.set! user.id do
      json.extract! user,
      :id,
      :email,
      :first_name,
      :last_name,
      :created_at,
      :updated_at

      if user.photo.attached?
        json.photo_url user.photo.url
      # else
      #   json.photo_url '../../frontend/src/assets/avatar/girl2.jpg' 
      else
        json.photo_url 'https://airbbc-dev.s3.amazonaws.com/cnrjp8vlhaneft38oj4ekz1syuca'
        # json.photo_url require("../../frontend/src/assets/avatar/animal-herocapybara.jpg")
      end
    end
  end
end

json.reviews do
  @reviews.each do |review|
    json.set! review.id do
      json.extract! review,
      :id,
      :user_id,
      :listing_id,
      :body,
      :cleanliness,
      :communication,
      :checkin,
      :accuracy,
      :location,
      :value,
      :rating
    end
  end
end

