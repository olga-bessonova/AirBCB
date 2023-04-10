class Api::ReviewsController < ApplicationController
  wrap_parameters include: Review.attribute_names + ['userId', 'listingId']

  def index
    @reviews = Reviews.all
    render :index
  end

  def create
    @review = Review.new(
      body: params[:body],

      cleanliness: params[:cleanliness],
      communication: params[:communication],
      checkin: params[:checkin],
      accuracy: params[:accuracy],
      location: params[:location],
      value: params[:value]
    )
    @review.user_id = current_user.id
      @review.rating: ((params[:cleanliness].to_int +
                        params[:communication].to_int +
                        params[:checkin].to_int +
                        params[:accuracy].to_int +
                        params[:location].to_int +
                        params[:value]) / 6.0)
    )
    

      if @review.save
        render :show
      else
        render json: @review.errors.full_messages, status: :unprocessable_entity
      end
  end

  def destroy
    @review = Review.find(params[:id])
    @review.destroy if current_user.id == @review.user_id
  end

  
end