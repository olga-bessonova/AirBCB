# app/views/api/users/show.json.jbuilder

json.user do
  json.extract! @user, :id, :email, :created_at, :updated_at
end