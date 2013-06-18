class Receiver < ActiveRecord::Base
  attr_accessible :address, :city, :description, :email, :howweuse, :kind, :name,
                  :neighborhood, :number, :phone, :receiving, :street,
                  :latitude, :longitude, :gmaps

  before_save :adjustdatabase

  def adjustdatabase
    self.city = self.city.downcase
    self.street = self.street.downcase
    self.kind = self.kind.downcase
    self.neighborhood = self.neighborhood.downcase
    self.receiving = self.receiving.downcase
  end


  geocoded_by :address
  after_validation :geocode          # auto-fetch coordinates

  reverse_geocoded_by :latitude, :longitude
  after_validation :reverse_geocode  # auto-fetch address

  acts_as_gmappable

  def gmaps4rails_address
    address
  end

  def address
    [street, number, neighborhood].compact.join(', ')
  end
end
