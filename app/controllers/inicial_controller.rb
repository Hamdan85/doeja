class InicialController < ApplicationController
  def index
    @json = Receiver.all.to_gmaps4rails do |address, marker|
      marker.infowindow render_to_string(:partial => "/shared/mapbox", :locals => { :address => address})
      marker.title "teste"
      marker.json('teste')
    end
  end
  def new
    @Receiver = Receiver.new
    puts @Receiver
  end

  def create
    @Receiver = Receiver.new(params[:receiver])
    @Receiver.save
    puts :complete_address
    redirect_to root_path
    puts params[:receiver]
  end
end
