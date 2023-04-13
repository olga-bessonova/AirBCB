json.user do
  json.extract! @user, :id, :email, :first_name, :last_name, :created_at, :updated_at

  if @user.photo.attached?
    json.photo_url @user.photo.url
  else
    json.photo_url 'https://airbbc-dev.s3.amazonaws.com/avatar/user1.jpg'
  end
end
