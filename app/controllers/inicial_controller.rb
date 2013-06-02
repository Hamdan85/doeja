class InicialController < ApplicationController
  def index
  end
  def new
    @receiver = Receiver.new
    puts @receiver
  end

  def create
    @receiver = Receiver.new(params[:receiver])
    @receiver.save
    puts params[:@receiver]
    redirect_to root_path
  end
end
