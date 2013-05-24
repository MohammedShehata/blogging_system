class ProfileController < ApplicationController
  before_filter :authenticate_user!
  
  def show
    @user = User.find params[:id]
  end

  def edit
  end

  def update
    puts "thanks my god #{params[:user][:username]} <<<<<<<<<<<<<<<<<<<<<<<<<"
    redirect_to :root
  end
  
end
