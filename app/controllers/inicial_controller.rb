# -*- encoding : utf-8 -*-
class InicialController < ApplicationController

  autocomplete :receiver, :receiving
  respond_to :html, :json

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
        UserRegistration.userRegister(@Receiver).deliver
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

    #Geocoding Users Address

    @useraddress = "#{params[:Donate][:address]}, #{params[:Donate][:neighborhood]}, #{params[:Donate][:city]}"

    userlocation = Geocoder.coordinates(@useraddress)

    #Assembling the JSON Hash of user's Marker

    usermarkhash = {:title => 'Você', :description => 'Você está aqui!', :animation => 'BOUNCE', :picture => '/assets/user.png', :height => 64, :width => 64, :lat => userlocation[0], :lng => userlocation[1]}

    #Looking for near place to receive the donation

    x=0

    @receiving = Receiver.where("lower(receiving) =? and lower(city) = ?", params[:Donate][:receiving].downcase,params[:Donate][:city].downcase).to_gmaps4rails do |address, marker|
      marker.infowindow render_to_string(:partial => '/shared/mapbox', :locals => { :address => address })
      marker.picture({
                         :picture => "/assets/bmarker.png",
                         :width   => 32,
                         :height  => 32
                     })
      marker.json(address)
    end

    if @receiving == '[]'
      @alert = 'Desculpe! Sem entradas para o pesquisado!'
    end

    #Adding user marker to Gmaps4Rails Marker

    @receiving = JSON(JSON.parse(@receiving).push(usermarkhash))

    #Responding to JSON request.

    respond_to do |format|
      format.json { render json: @receiving }
      format.js
    end
  end

  def tipodoacao

    @parameters = params[:query].downcase

    #if params[:query].nil? or params[:query] == 'receber...' || params[:query] == ''
    #  @tipodoacao = Receiver.all.uniq.pluck(:receiving)
    #else
      @tipodoacao = Receiver.where('lower(receiving) LIKE :prefix', prefix: "%#{@parameters}%").uniq.pluck(:receiving)
    #end

    puts @tipodoacao.inspect.gsub(']", "[', ',')[2..-3].as_json

    if @tipodoacao
      respond_to do |format|
        format.json { render json: @tipodoacao.inspect.gsub(']", "[', ',')[2..-3].as_json }
      end
    end

  end
end
