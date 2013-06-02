class Receiver < ActiveRecord::Base
  attr_accessible :city, :description, :email, :howweuse, :kind, :name, :neighborhood, :number, :phone, :receiving, :street

  geocoded_by :complete_address
  after_validation :geocode          # auto-fetch coordinates

  reverse_geocoded_by :latitude, :longitude
  after_validation :reverse_geocode  # auto-fetch address

  acts_as_gmappable

  def gmaps4rails_address
    address
  end

  def complete_address
    [street, number, neighborhood].compact.join(', ')
  end
end
