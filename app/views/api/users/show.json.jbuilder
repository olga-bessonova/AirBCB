json.user do
  json.extract! @user, :id, :email, :first_name, :last_name, :created_at, :updated_at

  if @user.photo.attached?
    json.photo_url @user.photo.url
  # else
  #   json.photo_url '../../frontend/src/assets/avatar/girl2.jpg' 
  else
    json.photo_url 'https://www.google.com/search?q=photo+profile&newwindow=1&rlz=1C1CHBF_enUS761US761&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiPopu_lKX-AhUnFlkFHTdPDXsQ0pQJegQIAxAC&biw=1707&bih=770&dpr=1.13#imgrc=XaQqp-4N5dV92M'
  end
end
