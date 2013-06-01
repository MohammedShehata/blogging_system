class ProfileController < ApplicationController
  before_filter :authenticate_user!
  require 'will_paginate/array'
  
  def show
    @user = User.find params[:id]
    if current_user == @user
       @posts = @user.posts.order("created_at DESC").page(params[:page]).per_page(5)
       # @like_posts = Post.where(:user).order("created_at DESC").page(params[:page]).per_page(5)
       @likes = current_user.likes.order("created_at DESC").page(params[:page]).per_page(5)
       @like_posts = @likes.map(&:post)
    else
      @posts = @user.posts.where("published_at is not null").order("published_at DESC").page(params[:page]).per_page(5)
    end
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
  
  def destroy
    current_user.destroy
    redirect_to :root, :notice => "Your Account Deleted Successfully"  
  end
  
  
end
