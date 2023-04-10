class Api::ListingsController < ApplicationController
#  render :index, :show 
  def index
    @listings = Listing.all
    render :index
  end

  def show
    @listing = Listing.find(params[:id])
    # render :show    
    render "/api/listings/show"    
  end

  def create
    @listing = Listing.new(
      title: params[:title],
      description: params[:description],
      place_type: params[:place_type],
      feature: params[:feature],
      num_of_bath: params[:num_of_bath],
      num_of_bed: params[:num_of_bed],
      max_guests: params[:max_guests],
      city: params[:city],
      country: params[:country],
      latitude: params[:latitude],
      longitude: params[:longitude],
      price: params[:price]
    )
    @listing.user_id = current_user.id
    if @listing.save
      render :show
    else
      render json: {errors: @listing.errors.full_messages}, status: unprocessable_entity
    end
  end

  def update
    @listing = Listing.find(params[:id])
    if @listing.update(
      title: params[:title],
      description: params[:description],
      place_type: params[:place_type],
      feature: params[:feature],
      num_of_bath: params[:num_of_bath],
      num_of_bed: params[:num_of_bed],
      max_guests: params[:max_guests],
      city: params[:city],
      country: params[:country],
      latitude: params[:latitude],
      longitude: params[:longitude],
      price: params[:price]
    )
      @listing.save
      render :show
    else
      render json: {errors: @listing.errors.full_messages}, status: unprocessable_entity
    end
  end

  def destroy
    @listing = Listing.find(params[:id])
    if current_user.id == @listing.iser_id 
      @listing.destroy
    end
  end

  # private

  # def listing_params
  #   params.require(:listing).permit()
  # end
end