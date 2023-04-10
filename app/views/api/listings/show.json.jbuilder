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