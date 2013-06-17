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
        @notice = 'Local salvo com sucesso. Muito Obrigado!!'
        format.html
        format.js
      else
        @notice = 'Erro!!'
        format.html
        format.js
      end
    end


  end

  def searchlocal

    @receiving2 = Receiver.where("receiving =? and city = ?", params[:Donate][:receiving],params[:Donate][:city]).to_gmaps4rails do |address, marker|
      marker.infowindow render_to_string(:partial => "/shared/mapbox", :locals => { :address => address })
      marker.title 'Gabriel fodao'
      marker.json(address)
    end

    respond_to do |format|
      format.html { render :nothing => true }
      format.json { render json: @receiving2 }
    end

    puts @receiving2

    if @receiving2 == '[]'
      @alert = 'Desculpe! Sem entradas para o pesquisado!'
    end
  end
end
