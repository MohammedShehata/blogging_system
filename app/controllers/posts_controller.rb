class PostsController < ApplicationController
  before_filter :authenticate_user!
  
  def index
    @posts = current_user.posts
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new params[:post]
    @post.published_at = Time.now
    @post.published = true
    @post.user = current_user
    
    if @post.save
      redirect_to posts_path
    else
      render :action => :new
    end   
  end
  
  def edit
  end

  def show
  end
  
end
