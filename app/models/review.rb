class Review < ApplicationRecord
  belongs_to :listing, class_name: :Listing
  belongs_to :user, class_name: :User

  validates :user_id, :listing_id, :body, :rating, presence: true
  validates :cleanliness, :communication, :checkin, :accuracy, :location, :value, presence: true, numericality: { only_integer: true, greater_than: 0, less_than_or_equal_to: 5 }
end