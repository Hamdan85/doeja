class InicialController < ApplicationController
  def index
  end

  def new
    @Receiver = Receiver.new
  end
end
