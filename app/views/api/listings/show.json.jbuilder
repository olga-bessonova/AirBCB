json.listing do
  json.partial! 'api/listings/listing', 
  listing: @listing
end

json.user do
  json.extract! @user,
    :id,
    :email,
    :first_name,
    :last_name,
    :created_at,
    :updated_at
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

