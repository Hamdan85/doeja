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

    puts @Donate

    puts 'oioioi'

    @locals = Receiver.find_all_by_receiving(params[@Donate])

    respond_to do |format|
      format.html { render :nothing => true }
      format.js
    end

  end
end
