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

    respond_to do |format|
      if @Receiver.save
        UserRegistration.userRegister(@Receiver).deliver
        @alert = 'Local salvo com sucesso. Muito Obrigado!!'
        format.html
        format.js
      else
        @Receiver.errors.to_a.each do |item|
          @errors = "#{@errors} \n + #{item}".to_s
        end
        format.js { render 'inicial/createerror' }
      end

    end

  end

  def searchlocal

    #Geocoding Users Address

    @useraddress = "#{params[:Donate][:address]}"

    if @useraddress == ''
        @alert = 'Desculpe! Você não digitou um endereço!'
    else
      userlocation = Geocoder.search(@useraddress)[0]


      #Assembling the JSON Hash of user's Marker

      usermarkhash = {:title => 'Você', :description => 'Você está aqui!', :animation => 'BOUNCE', :picture => '/assets/user.png', :height => 64, :width => 64, :lat => userlocation.latitude, :lng => userlocation.longitude}

      #Looking for near place to receive the donation

      @receiving = Receiver.where("lower(receiving) =? and lower(city) = ?", params[:Donate][:receiving].downcase,userlocation.city.downcase).to_gmaps4rails do |address, marker|
        #dlat = userlocation.latitude-address["latitude"]
        #dlon = userlocation.longitude-address["longitude"]
        #a =  (Math.sin(dlat/2))**2 + Math.cos(userlocation.latitude) * Math.cos(address["latitude"]) * (Math.sin(dlon/2))**2
        #c = 2 * Math.atan2( Math.sqrt(a), Math.sqrt(1-a) )
        #distance = (3961 * c)/1.609344

        distance = Geocoder::Calculations.distance_between([userlocation.latitude,userlocation.longitude],[address["latitude"],address["longitude"]])/1.609344

        marker.infowindow render_to_string(:partial => '/shared/mapbox', :locals => { :address => address, :distance => distance })
        "\"class\": \"mapstyle\""
        marker.picture({
                           :picture => "/assets/bmarker.png",
                           :width   => 32,
                           :height  => 32
                       })
        marker.json({ :distance => distance })


      end

      if @receiving == '[]'
        @alert = 'Desculpe! Sem entradas para o pesquisado!'
      end

      hash = JSON.parse(@receiving)
      hash.each do |item|


        #item['distance'] = Geocoder::Calculations.distance_between([userlocation.latitude,userlocation.longitude],[address["latitude"],item["lng"]])/1.609344
      end

      @receiving = hash

      #Adding user marker to Gmaps4Rails Marker

      @receiving = JSON(hash.push(usermarkhash))

      #Responding to JSON request.

    end

    puts @alert

    respond_to do |format|
      format.json { render json: @receiving }
      format.js
    end
  end

  def addressautocomplete

    require 'open-uri'

    address = params[:term]
    addresscomplete =  JSON.parse(open("https://maps.googleapis.com/maps/api/geocode/json?address=#{address.gsub(' ', '+')}&sensor=true").read)['results']

    respond_to do |format|
      format.json { render json: addresscomplete }
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
