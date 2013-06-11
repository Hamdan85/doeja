class InicialController < ApplicationController

  respond_to :json, :html

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
    redirect_to root_path
    puts params[:receiver]
  end

  def searchlocal
    @json = Receiver.all.to_gmaps4rails do |address, marker|
        marker.infowindow render_to_string(:partial => "/shared/mapbox", :locals => { :address => address })
        marker.title
        marker.json(address)
    end

    respond_to do |format|
      format.html
      format.json {render json:@json}
    end
   end
end
