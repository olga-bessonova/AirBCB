class Listing < ApplicationRecord

  validates :place_type, inclusion: { in: %w[entire_place private_room shared_room], message: "place_type must be one of: entire_place, private_room, shared_room" }
  validates :feature, inclusion: { in: %w[luxe omg trending amazing_pools bed_breakfast new creative_spaces adapted], 
              message: "feature must be one of: luxe, omg, tiny_homes, trending, amazing_pools, bed_breakfast, new, creative_spaces, adapted" }  

  validates :num_of_bath, :num_of_bed, numericality: {only_integer: true, greater_than_or_equal_to: 0, message: "Minimum 0 bathrooms"}, presence: true
  validates :max_guests, numericality: {only_integer: true, greater_than: 0, message: "Minimum 0 bedrooms"}, presence: true

  validates :city, :country, :title, :description, presence: true

  validates :latitude, :longitude, presence: true, numericality: {greater_than_or_equal_to: -180, less_than_or_equal_to: 180, message: 'must be between -180 and 180'}

  validates :price, numericality: {greater_than_or_equal_to: 0, message: "Price must be >= 0"}, presence: true

  belongs_to :user, class_name: :User
  has_many :reviews, dependent: :destroy
  has_many_attached :images, dependent: :destroy

end