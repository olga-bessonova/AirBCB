class Api::ReviewsController < ApplicationController
  wrap_parameters include: Review.attribute_names + ['userId', 'listingId']

  def index
    @reviews = Review.all
    render :index
  end

  def create
    @review = Review.new(
      listing_id: params[:listing_id],
      body: params[:body],
      cleanliness: params[:cleanliness],
      communication: params[:communication],
      checkin: params[:checkin],
      accuracy: params[:accuracy],
      location: params[:location],
      value: params[:value]
    )
    @review.user_id = current_user.id
    @review.rating   = (params[:cleanliness].to_int +
                        params[:communication].to_int +
                        params[:checkin].to_int +
                        params[:accuracy].to_int +
                        params[:location].to_int +
                        params[:value]) / 6.0
    
    

      if @review.save
        render :show
      else
        render json: @review.errors.full_messages, status: :unprocessable_entity
      end
  end

  # def update
  #   if @post.update(
  #     user_id: params[:user_id],
  #     listing_id: params[:listing_id],
  #     body: params[:body],
  #     cleanliness: params[:cleanliness],
  #     communication: params[:communication],
  #     checkin: params[:checkin],
  #     accuracy: params[:accuracy],
  #     location: params[:location],
  #     value: params[:value],
  #     rating: params[:rating]
  #   )
  #     render :show
  #   else
  #     render json: @post.errors.full_messages, status: 422
  #   end
  # end

  def update
    @review = Review.find(params[:id])

    if current_user.id == @review.user_id
      if @review.update(
        user_id: params[:user_id],
        listing_id: params[:listing_id],
        body: params[:body],
        cleanliness: params[:cleanliness],
        communication: params[:communication],
        checkin: params[:checkin],
        accuracy: params[:accuracy],
        location: params[:location],
        value: params[:value],
        rating: params[:rating])
        render :show
      else
        render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { errors: ["You can edit only your reviews"] }
    end
  end

  def destroy
    @review = Review.find(params[:id])
    @review.destroy if current_user.id == @review.user_id
  end

  
end