class ProfileController < ApplicationController
  before_filter :authenticate_user!
  
  def show
    @user = User.find params[:id]
  end

  def edit
  end

  def update
    if params[:commit] == "Cancel"
      redirect_to profile_path current_user     
    elsif current_user.update_attributes(:username => params[:user][:username], :firstname => params[:user][:firstname],
          :lastname => params[:user][:lastname], :info => params[:user][:info])
      redirect_to profile_path(current_user), :notice => "profile updated succefully!"     
    else
        render :action => :edit
    end
  end
  
end
