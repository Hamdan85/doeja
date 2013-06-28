# -*- encoding : utf-8 -*-
class Receiver < ActiveRecord::Base
  attr_accessible :address, :compl, :city, :description, :email, :kind, :name,
                  :neighborhood, :phone, :receiving,
                  :latitude, :longitude, :gmaps, :token

  before_save :adjustdatabase

  #before_validation :createtokenfordelete

  validates :kind, :presence => true
  validates :address, :presence => true
  validates :token, :presence => true, :uniqueness => true

  #def createtokenfordelete
  #  self.token = SecureRandom.urlsafe_base64
  #end

  def adjustdatabase

    address = self.address

    self.city = self.city.downcase
    self.neighborhood = self.neighborhood.downcase
    self.receiving = self.receiving.downcase

    #Kind of Organization

    if (self.kind == '1')
      self.kind = 'Pessoa Física'
    elsif (self.kind == '2')
      self.kind = 'Pessoa Jurídica'
    elsif (self.kind == '3')
      self.kind = 'ONG'
    elsif (self.kind == '4')
      self.kind = 'Centro Religioso'
    end
  end

  geocoded_by :gmaps4rails_address
  after_validation :geocode          # auto-fetch coordinates

  reverse_geocoded_by :latitude, :longitude
  after_validation :reverse_geocode  # auto-fetch address



  acts_as_gmappable :normalized_address => :address,
                    :process_geocoding => :geocode?,
                    :msg => "Desculpe! Seu endereço não foi encontrado. Confira e tente novamente.magic_encode"

  def geocode?
    (!address.blank? && (latitude.blank? || longitude.blank?)) || address_changed?
  end

  def gmaps4rails_address
    "#{self.address},#{self.neighborhood},#{self.city}"
  end

  def generate_token(size = 12, &validity)
    constant = "#{self.class.name}#{id}"

    begin
      token = CGI::Session.generate_unique_id(constant).first(size)
    end while !validity.call(token) if block_given?

    token
  end

  def set_token
    self.token = generate_token { |token| self.class.find_by_token(token).nil? }
  end

end
