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
      marker.json(address)
    end

    if @receiving2 == '[]'
      @alert = 'Desculpe! Sem entradas para o pesquisado!'
    end

    respond_to do |format|
      format.json { render json: @receiving2 }
      puts @receiving2
      format.js
    end
  end

  def tipodoacao

    @tipodoacao = Receiver.where('receiving LIKE :prefix', prefix: "%#{params[:query]}%").uniq.pluck(:receiving)

    if @tipodoacao
      respond_to do |format|
        format.json { render json: @tipodoacao.as_json }
      end
    end

  end
end
