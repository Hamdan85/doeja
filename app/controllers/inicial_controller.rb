# -*- encoding : utf-8 -*-
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

    @receiving2 = Receiver.where("lower(receiving) =? and lower(city) = ?", params[:Donate][:receiving].downcase,params[:Donate][:city].downcase).to_gmaps4rails do |address, marker|
      marker.infowindow render_to_string(:partial => "/shared/mapbox", :locals => { :address => address })
      marker.picture({
                         :picture => "/assets/bmarker.png",
                         :width   => 32,
                         :height  => 32
                     })
      marker.json(address)
    end

    if @receiving2 == '[]'
      @alert = 'Desculpe! Sem entradas para o pesquisado!'
    end

    puts params[:Donate][:receiving]

    puts @receiving2

    respond_to do |format|
      format.json { render json: @receiving2 }
      format.js
    end
  end

  def tipodoacao

    @parameters = params[:query].downcase

    if params[:query].nil?
      @tipodoacao = Receiver.all.uniq.pluck(:receiving)
    else
      @tipodoacao = Receiver.where('lower(receiving) LIKE :prefix', prefix: "%#{@parameters}%").uniq.pluck(:receiving)
    end

    if @tipodoacao
      respond_to do |format|
        format.json { render json: @tipodoacao.as_json }
      end
    end

  end
end
