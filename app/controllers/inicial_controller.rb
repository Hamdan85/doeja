class InicialController < ApplicationController

  respond_to :json, :html

  def index

  end
  def new
    @Receiver = Receiver.new
  end

  def create
    @Receiver = Receiver.new(params[:receiver])
    @Receiver.save
    redirect_to root_path
  end

  def searchlocal

    #puts 'okokokokokokok'
    #puts params[receiver.first]
    #@preload = Receiver.find_by_city(params[receiver.city])

    @json = Receiver.all.to_gmaps4rails do |address, marker|
        marker.infowindow render_to_string(:partial => "/shared/mapbox", :locals => { :address => address })
        marker.title
        marker.json(address)
    end

    respond_to @json
   end
end
