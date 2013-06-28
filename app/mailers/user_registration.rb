# -*- encoding : utf-8 -*-
class UserRegistration < ActionMailer::Base
  default from: "ghamdan.eng@gmail.com"

  def userRegister(user)
    @user = user
    @token = Receiver.find(@user.id).token
    @url  = 'http://www.doeja.com/welcomeuser'
    email_with_name = 'Doe Já'
    mail(:to => @user.email, :subject => 'Bem Vindo ao Doe Já')
  end

end
