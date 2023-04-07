class Api::UsersController < ApplicationController

  def index
    @listing = Listing.all
    render :index
  end

  def show
    @listing = Listing.find(params[:id])    
  end

  # def create
  #   @listing = Listing.new()
  # end

  # def update
  #   @listing = Listing.new()
  # end

    # def destroy
  #   @listing = Listing.new()
  # end
end