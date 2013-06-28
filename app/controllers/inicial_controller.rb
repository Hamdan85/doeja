# -*- encoding : utf-8 -*-
class InicialController < ApplicationController
  respond_to :html, :json

  def index

  end

  def new
    @Receiver = Receiver.new
  end

  def create
    @Receiver = Receiver.new(params[:receiver])
    @Receiver.token = loop do
      random_token = SecureRandom.urlsafe_base64
      break random_token unless Receiver.where(token: random_token).exists?
    end
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

  def donationkind

    parameters = params[:term].downcase


    if parameters.nil? or parameters == 'receber...' or parameters == ''
      @tipodoacao = Receiver.all
    else
      @tipodoacao = Receiver.where('lower(receiving) LIKE :prefix', prefix: "%#{parameters}%")
    end

    x = 0
    json = []
    @tipodoacao.uniq.pluck(:receiving).each do |item|
        json.push({"id" => x, "label" => item })
        x = x+1
    end

    if @tipodoacao
      respond_to do |format|
        format.json { render json: json }
      end
    end

  end

  def destroylocal
    if params[:deletetoken].nil?
      puts params[:deletetoken]

    else
      @local = Receiver.find_by_token(params[:deletetoken])
      if !@local.nil?
        noticedelete = 'Parâmetros inválidos!'
        @local.destroy
        noticedelete = 'Local deletado com sucesso!'
      else
        noticedelete = 'Local não existe!'
      end
    end

    respond_to do |format|
      flash[:notice] = noticedelete
      format.html  { render :action => 'index' }
    end
  end

end
