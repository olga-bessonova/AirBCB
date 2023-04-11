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
