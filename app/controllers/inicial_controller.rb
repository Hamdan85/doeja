class InicialController < ApplicationController

  respond_to :json, :html

  def index

  end
  def new
    @Receiver = Receiver.new
  end

  def create
    @Receiver = Receiver.new(params[:receiver])
    @Receiver.save!

    respond_to do |format|
      if @Receiver.save
        format.html { redirect_to(@Receiver, :notice => 'Feito!')}
        format.js
      else
        format.html { redirect_to(@Receiver, :notice => 'Erro!', )}
        format.js
      end
    end


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

    respond_to do |format|
      format.html { redirect_to(@json) }
      format.js

    end
  end
end
