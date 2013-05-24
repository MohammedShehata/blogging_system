class HomeController < ApplicationController
  before_filter :authenticate_user!, :except => [:search]  
  def search
  end
  
  def result
    @users = User.where("username like ?", "%#{params[:str]}%")
    render :action => "search"
  end
  
end
