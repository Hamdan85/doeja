class Receiver < ActiveRecord::Base
  attr_accessible :address, :compl, :city, :description, :email, :kind, :name,
                  :neighborhood, :phone, :receiving,
                  :latitude, :longitude, :gmaps

  before_save :adjustdatabase

  validates :kind, :presence => true
  validates :address, :presence => true

  def adjustdatabase

    address = self.address

    self.city = self.city.downcase
    self.kind = self.kind.downcase
    self.neighborhood = self.neighborhood.downcase
    self.receiving = self.receiving.downcase
  end

  geocoded_by :gmaps4rails_address
  after_validation :geocode          # auto-fetch coordinates

  reverse_geocoded_by :latitude, :longitude
  after_validation :reverse_geocode  # auto-fetch address



  acts_as_gmappable :normalized_address => :address,
                    :process_geocoding => :geocode?,
                    :msg => "Desculpe! Seu endereço não foi encontrado. Confira e tente novamente."

  def geocode?
    (!address.blank? && (lat.blank? || lng.blank?)) || address_changed?
  end

  def gmaps4rails_address
    "#{self.address},#{self.neighborhood},#{self.city}"
  end

end
