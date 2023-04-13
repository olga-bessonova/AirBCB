# @listings.each do |listing|
#   json.set! listing.id do
#     json.partial! 'api/listings/listing', listing: listing
#     if @listing.photos.attached?
#       json.photos_url @listing.photos.map{|photo| photo.url}
#     else
#       json.photos_url ['https://airbbc-dev.s3.amazonaws.com/listings/1/1.jpg']
#     end
#   end
# end


@listings.each do |listing|
	json.set! listing.id do 
		json.extract! listing,
      :id,
      :user_id,
      :title,
      :description,
      :place_type,
      :feature,
      :num_of_bath,
      :num_of_bed,
      :max_guests,
      :city,
      :country,
      :latitude,
      :longitude,
      :price 


		if listing.photos.attached? 
			json.photos_url listing.photos.map {|photo| photo.url}
		else 
			json.photos_url ['https://airbbc-dev.s3.amazonaws.com/listings/1/1.jpg']
		end
	end
end